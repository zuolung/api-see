import pat from "path";
import fs from "fs";
import prettier from "prettier";
import * as ora from "ora";
import { pinyin } from "pinyin-pro";
import log from "../log";
import { getPrettierConfig } from "../config/getPrettierConfig";
import { createTypeFileName } from "./createTypeFileName";
import { versionCompatible } from "./versionCompatible";
import { Iconfig } from "global";
import { createDefaultModel } from "../create-action/create";
/**
 * 过滤符合restful标准的参数类型
 * @param parameters 请求字段描述
 * @param method 请求方法
 * @returns 
 */
function restfullApiParamsFilter(parameters, method) {
  const parametersNew = []
  let filterMap = {
    'get': 'query',
    'post': 'body',
    'put': 'body',
    'delete': 'body',
  }
  let filter = filterMap[method] || 'body'
  for (const key in parameters) {
    const item = parameters[key]
    if (item.in === filter) {
      parametersNew.push(item)
    }
  }

  return parametersNew
}
/**
 * 创建swagger基础类型ts
 * @param param0 基础类型描述、生成基础类型文件的路径
 */
function createSwaggerBaseType({
  definitions,
  BaseTypesUrl
}) {
  const allFormatDefKeys = Object.keys(definitions).map(k => formatBaseTypeKey(k))
  let baseTypes = `  /* eslint-disable camelcase */
  `;

  for (const key in definitions) {
    const def = definitions[key]

    const parseResult = parseDef(def)
    const commentsParams: any = {}
    if (def.description) {
      commentsParams['description'] = def.description || def
    } else if (!key.includes('[') && !key.includes('【')){
      commentsParams['description'] = key
    }
    const baseKey = formatBaseTypeKey(key)

    const comments = createComments(commentsParams)
    // 替换基类中没有的引用
    parseResult.dependencies?.forEach(d => {
      if (!allFormatDefKeys.includes(d)) {
        parseResult.codes = parseResult.codes.replace(d, 'any')
      }
    })
    baseTypes += `${comments}export type ${baseKey} = ${parseResult.codes}`
  }

  fs.writeFileSync(BaseTypesUrl, formatTs(baseTypes));
}

let prettierConfig = {}
/**
 * 
 * @param data swagger数据
 * @param path 所有
 * @param modules 
 * @param serviceName 
 * @param actionConfig 
 */
export async function transform(
  data: Record<string, any>,
  path: string,
  modules?: string[],
  serviceName?: string,
  actionConfig?: Iconfig["action"]
) {
  prettierConfig = await getPrettierConfig()
  // 最外层文件路径
  const outDir = pat.resolve(process.cwd(), path);
  // 请求swagger服务对应文件路径
  const swaggersDir = pat.resolve(process.cwd(), path, serviceName);
  // 请求ts类型对应文件所在路径
  const typesUrl = pat.resolve(process.cwd(), path, serviceName, "./types");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }
  if (!fs.existsSync(swaggersDir)) {
    fs.mkdirSync(swaggersDir);
  }
  if (!fs.existsSync(typesUrl)) {
    fs.mkdirSync(typesUrl);
  }
  // 使用到的接口的描述集合
  const result: any = {};
  const { definitions } = versionCompatible({
    data: data,
  });
  const BaseTypesUrl = pat.resolve(typesUrl, "./swagger-base.ts");
  createSwaggerBaseType({
    BaseTypesUrl,
    definitions
  })
  const paths = data["paths"];
  const spinner = ora.default();

  console.info(log.tips("swagger数据解析中..."));

  for (const key in paths) {
    const method = Object.keys(paths[key])[0] as string;
    const item = paths[key][method];
    const moduleName =
      modules && modules.length
        ? item.tags.find((it) => modules.includes(it))
        : item.tags[0];
      
    if (!modules || modules.length === 0 || modules.includes(moduleName)) {
      if (!result[moduleName]) {
        result[moduleName] = {};
        result[moduleName].codes = "";
        result[moduleName].dependencies = [];
        result[moduleName].firstUrl = key;
        result[moduleName].action = {}; // 模块相关请求
      }
      // 请求数据拼装
      let reqCodes = "";

      let parameters: Record<string, any> = versionCompatible({
        requestParams: item,
        data: data,
      }).pathsRequestParams;

      // restfulApi请求参数规则
      parameters = restfullApiParamsFilter(parameters, method)

      for (const km in parameters) {
        let it = parameters[km]
        let name = it.name
        if (it.in === 'body') {
          it = it.schema
          name = ''
        }
        const { codes, dependencies } = parseDef(it, name);
        reqCodes += `${codes}`;

        dependencies.map((dep) => {
          if (!result[moduleName].dependencies.includes(dep)) {
            result[moduleName].dependencies.push(dep);
          }
        });
      }

      if (reqCodes.includes(":")) {
        reqCodes = `{
          ${reqCodes}
        }`;
      }

      if (!reqCodes) reqCodes = "undefined \n";

      // 响应数据拼装
      let resCodes = ``;
      const responseItem = versionCompatible({
        responseData: item,
        data: data,
      }).pathsResponseData;

      if (
        responseItem &&
        responseItem?.schema &&
        (responseItem?.schema?.type === "object" || responseItem?.schema.$ref)
      ) {
        const schema = responseItem;
        const resParseResult = parseDef(schema);
        resCodes += resParseResult.codes;

        resParseResult.dependencies.map((dep) => {
          if (!result[moduleName].dependencies.includes(dep)) {
            result[moduleName].dependencies.push(dep);
          }
        });
      } else {
        resCodes = "undefined";
      }

      const typeName = getRequestTypeName(key);
      result[moduleName].codes += `
    /**
     * ${item.summary || "--"}
     * @url ${key}
     * @method ${method}
     * @introduce ${item.description || "--"}
     */
    export type ${typeName} = {
      request: ${reqCodes}
      response: ${resCodes}
    }
    `;

      const defKey = responseItem?.schema?.$ref?.replace(
        "#/components/schemas/",
        ""
      )?.replace("#/definitions/", "");
      let hasResponseData = false;
      if (defKey) {
        const responseData = definitions[defKey];
        if (responseData?.type === "object" && responseData?.properties?.data) {
          hasResponseData = true;
        }
      }

      const queryMatch = key.match(/\{[a-z\-A-Z]+\}/)
      let queryKey = queryMatch ? queryMatch[0] : ''

      // 请求方法生成需要数据
      result[moduleName].action[typeName] = {
        url: key,
        serviceName: serviceName,
        description: item.summary?.replace(/\*/g, ''),
        introduce: item.description?.replace(/\*/g, ''),
        method,
        hasResponseData,
        hasRequestQuery: !!queryKey,
        queryKey,
      };
    }
  }

  for (const nn in result) {
    const mode = result[nn];
    const baseImport = `
    /* eslint-disable camelcase */
    import type { ${mode.dependencies.join(",")} } from "./swagger-base";
      `;
    const tsPath = pat.join(typesUrl, `${createTypeFileName?.(nn)}.ts`);
    await fs.writeFileSync(tsPath, formatTs(`${baseImport}${mode.codes}`));

    let content = "";

    const c = {
      requestFnName: actionConfig?.requestFnName,
      fileName: createTypeFileName?.(nn),
      requestSuffix: actionConfig?.requestSuffix,
      requestImport: actionConfig?.requestImport,
      data: result[nn].action,
    };

    if (!actionConfig?.createDefaultModel) {
      content = createDefaultModel(c);
    } else {
      content = actionConfig?.createDefaultModel(c);
    }

    const formatContent = formatTs(content);

    let writeActionTarget = pat.join(
      tsPath,
      actionConfig?.dirPath || "../../actions"
    );

    if (!fs.existsSync(writeActionTarget)) {
      await fs.mkdirSync(writeActionTarget);
    }

    await fs.writeFileSync(
      pat.resolve(writeActionTarget, `${createTypeFileName?.(nn)}.ts`),
      formatContent
    );
  }


  console.info(
    log.success(`
  👊 swagger数据解析完成
`)
  );

  spinner.stop();
}
/**
 * 
 * @param key 
 * @param required 
 * @param requireArr 
 * @returns 
 */
function ifNotRequired(key, required, requireArr) {
  if (required === false) return true;
  if (requireArr && requireArr.length && !requireArr.includes(key)) return true;

  return false;
}
/**
 * 
 * @param def 字段描述的数据
 * @param kk 字段的key
 * @returns 
 */
function parseDef(def: Record<string, any>, kk?: string) {
  const dependencies: any[] = [];
  const result = workUnit(def, kk);
  /**
   * 
   * @param data 字段描述数据
   * @param key  字段名称
   * @param noMark 后续是否不需要换行
   * @param requiredArr 必填字段有哪些
   * @returns string
   */
  function workUnit(
    data,
    key?: string,
    noMark?: boolean,
    requiredArr?: string[]
  ) {
    if (key && key.includes(".")) return "";
    // 中文作为字段名的时候，移除无效字符
    if (key && key.match(/[\u4e00-\u9fa5]/g)) {
      key = key.replace(/[\.\,\，\.\-\*\\\/]/g, "");
    }
    const noRequired = ifNotRequired(key, data.required, requiredArr)
      ? "?"
      : "";
    const ifNull = data?.nullable === true ? " | null" : "";

    let res = "";
    if (data.type && isBaseType(data.type)) {
      let type__ = resetTypeName(data.type);
      let $value = "";
      const $description = data.description;
      if (key) {
        if (type__ === "string" || type__ === "number") {
          if (data.default) $value = data.default;
          if (data.enum)
            $value = `[${data.enum
              .map((it) => {
                if (!it.includes(`'`) && !it.includes(`"`)) return `"${it}"`;
                return it;
              })
              .join(",")}]`;
          if (data.format === "date-time") {
            $value = `#datetime()`;
          }
        }

        // 枚举数据处理
        if ((type__ === "string" || type__ === "number") && data.enum) {
          type__ = `(${data.enum
            .map((item, i) => {
              if (i !== data.enum.length - 1) {
                return `"${item}" |`;
              } else {
                return `"${item}"`;
              }
            })
            .join("")})`;
        }

        const commentsParams: Record<string, any> = {};
        if ($value) commentsParams["value"] = $value;
        if ($description) commentsParams["description"] = $description;

        const comments = createComments(commentsParams);

        return `${comments}${key}${noRequired}:${type__}${ifNull}${
          noMark ? "" : " \n"
        }`;
      } else return type__;
    } else if (data.type === "object" || data.schema?.type === "object") {
      const properties = data.properties || data.schema?.properties;
      const curRequiredArr =
        data.required && Array.isArray(data.required) ? data.required : [];

      if (!properties) {
        if (
          !data.additionalProperties ||
          JSON.stringify(data.additionalProperties) === "{}"
        ) {
          if (key) {
            res = `${key}${noRequired}:{}${noMark ? "" : "\n"}`;
          } else {
            res = `{}${noMark ? "" : "\n"}`;
          }
        } else {
          const nextWork = workUnit(
            data.additionalProperties,
            undefined,
            undefined,
            curRequiredArr
          );
          if (key) {
            res = `${key}${noRequired}:Record<string, ${nextWork || "null"}>${
              noMark ? "" : "\n"
            }`;
          } else {
            res = `Record<string, ${nextWork}>${noMark ? "" : "\n"}`;
          }
        }
      } else {
        if (!key) res += `{ \n `;

        for (const kk in properties) {
          const item = properties[kk];
          res += workUnit(item, kk, undefined, curRequiredArr);
        }

        if (!key) res += `} ${noMark ? "" : "\n"}`;
      }
    } else if (data.type === "array" || data.schema?.type === "array") {
      const type__ = data.type || data.schema?.type || {};
      const items__ = data.items || data.schema?.items || {};
      if (Object.keys(items__).length === 0) {
        res += `${key}${noRequired}:any[] ${noMark ? "" : "\n"}  `;
      } else {
        if (type__ && isBaseType(type__)) {
          res += workUnit(
            {
              ...items__,
              description: data.description,
            },
            key,
            true,
            requiredArr
          );
        } else if (items__ && !isBaseType(type__)) {
          if (items__.properties) res += `{ \n `;
          res += workUnit(
            {
              ...items__,
              description: data.description,
              rule: 2,
            },
            key,
            true,
            requiredArr
          );
          if (items__.properties) res += `} ${noMark ? "" : "\n"}`;
        } else if (data.items?.$ref) {
          const $ref = formatBaseTypeKey(data.items?.$ref);
          dependencies.push($ref);
          res += workUnit({ type: $ref }, key, true);
        }
        res += `[] ${ifNull} ${noMark ? "" : "\n"} `;
      }
    } else if (data.schema?.$ref || data.$ref) {
      const commentsParams: Record<string, any> = {};
      if (data.rule) commentsParams["value"] = data.rule;
      if (data.description) commentsParams["description"] = data.description;

      const comments = createComments(commentsParams);

      let $ref = formatBaseTypeKey(data.schema?.$ref || data?.$ref);
      if ($ref === "List") {
        $ref = "any[]";
      }
      if ($ref === "Map") {
        $ref = "Record<string, any>";
      }
      if ($ref === "Set") {
        $ref = "any[]";
      }
      dependencies.push($ref);
      return `${key ? `${comments}${key}${noRequired}:` : ""}${$ref}${ifNull}${
        noMark ? "" : " \n "
      }`;
    } else if (data.schema) {
      // v3版本兼容
      return workUnit(data.schema, key);
    }

    return res;
  }

  return {
    codes: result,
    dependencies: dependencies,
  };
}

function isBaseType(d?: string) {
  return !["object", "array"].includes(d || "");
}
/**
 * 映射新的基础类型名称
 * @param type 
 * @returns 
 */
function resetTypeName(type) {
  if (type === "file") return "string";
  if (type === "integer") return "number";
  if (type === "ref") return "string";
  return type;
}
/**
 * 代码格式化
 * @param str ts代码
 * @returns 
 */
function formatTs(str) {
  // 空对象处理
  str = str?.replace(/\{\}/g, "Record<string, any>");

  // eslint-disable-next-line import/no-named-as-default-member
  return prettier.format(str, {
    ...prettierConfig,
    parser: "typescript",
  });
}

function getRequestTypeName(url) {
  const arrUrl = url.split("/").map((item) => {
    // 防止使用 a/${xxId}/abc
    return item.replace("{", "").replace("}", "");
  });

  if (arrUrl.length > 1) {
    let n = "";
    for (let i = 0; i <= arrUrl.length; i++) {
      if (arrUrl[i]) {
        n += wordFirstBig(arrUrl[i]);
      }
    }
    n = n.replace(/\-/g, "").replace(/\./g, "");

    return n;
  } else {
    return arrUrl[0];
  }
}

export function wordFirstBig(str: string) {
  return str.substring(0, 1).toLocaleUpperCase() + str.substring(1);
}
/**
 * 格式化引用字段名称和基础类型字段名称
 * @param key 
 * @returns 
 */
function formatBaseTypeKey(key) {
  let res = key;
  res = res
    .replace("#/components/schemas/", "")
    .replace("#/definitions/", "")
    .replace(/\`/g, "");

  res = res
    .split("«")
    .filter((it) => !!it)
    .join("_")
    .split("»")
    .filter((it) => !!it)
    .join("_");

  res = res.replace(/[^\u4e00-\u9fa5_a-zA-Z]/g, "");
  res = pinyin(res, { toneType: "none" });
  res = res.replace(/\s/g, "");

  return wordFirstBig(res);
}
/**
 * 创建注释
 * @param params 
 * @returns 
 */
function createComments(params?: Record<string, any>) {
  let res = "";
  if (params && Object.keys(params).length > 0) {
    res += `/**
    `;
    for (const key in params) {
      res += ` * @${key} ${(params?.[key] + '')?.replace(/\*/g, '')}
      `;
    }
    res += `*/
    `;
  }

  return res;
}
