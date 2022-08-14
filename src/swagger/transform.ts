import pat from "path";
import fs from "fs";
import prettier from "prettier";
import log from "../log.js";
import { getPrettierConfig } from "../config/getPrettierConfig.js";
import * as ora from "ora";

const typeNameCache = [];
let prettierConfig = {};
const DEAULT_RESPONSE = `{
  /**
   * @value 200
   */
  code: number
  /**
   * @value success
   */
  success: boolean
}`;

export async function transform(
  data: Record<string, any>,
  path?: string,
  modules?: string[],
  createTypeFileName?: (url: string) => string
) {
  const typesUrl = pat.resolve(process.cwd(), path);
  const BaseTypesUrl = pat.resolve(typesUrl, "../baseTypes.ts");
  const result: any = {};
  const definitions = data["definitions"];
  const paths = data["paths"];

  let baseTypes = "";
  prettierConfig = await getPrettierConfig();
  if (!fs.existsSync(typesUrl)) {
    fs.mkdirSync(typesUrl);
  }

  const spinner = ora.default();

  console.info(log.tips("swagger数据解析中..."));

  for (let key in definitions) {
    let def = definitions[key];

    const parseResult = parseDef(def);
    baseTypes += `
    /**
     * ${def.description || "--"}
     */
    export type ${formatBaseTypeKey(key)} = ${parseResult.codes}`;
  }
  await fs.writeFileSync(BaseTypesUrl, formatTs(baseTypes));

  for (let key in paths) {
    const method = Object.keys(paths[key])[0];
    const item = paths[key][method];
    const moduleName = item.tags[0];

    if (!modules || modules.length === 0 || modules.includes(moduleName)) {
      if (!result[moduleName]) {
        result[moduleName] = {};
        result[moduleName].codes = "";
        result[moduleName].dependencies = [];
        result[moduleName].firstUrl = key;
      }

      let reqCodes = `{ \n `;
      const parameters = filterRepeatName(item.parameters);

      for (let km in parameters) {
        const it = parameters[km];
        const { codes, dependencies } = parseDef(it, it.name);
        reqCodes += `${codes}`;

        dependencies.map((dep) => {
          if (!result[moduleName].dependencies.includes(dep)) {
            result[moduleName].dependencies.push(dep);
          }
        });
      }

      reqCodes += `} \n `;

      let resCodes = ``;
      if (item.responses["200"]?.schema) {
        const schema = item.responses["200"];
        const resParseResult = parseDef(schema);
        resCodes += resParseResult.codes;

        resParseResult.dependencies.map((dep) => {
          if (!result[moduleName].dependencies.includes(dep)) {
            result[moduleName].dependencies.push(dep);
          }
        });
      } else {
        resCodes = DEAULT_RESPONSE;
      }

      const typeName = getRequestTypeName(key);
      result[moduleName].codes += `
    /**
     * ${item.summary || "--"}
     * @url ${key}
     * @method ${method}
     * @introduce ${item.description || "--"}
     */
    export type I${typeName} = {
      request: ${reqCodes}
      response: ${resCodes}
    }
    `;
    }
  }

  for (const nn in result) {
    const mode = result[nn];
    let baseImport = `import { ${mode.dependencies.join(
      ","
    )} } from "../baseTypes";
      `;
    await fs.writeFileSync(
      pat.join(typesUrl, `${createTypeFileName(mode.firstUrl)}.ts`),
      formatTs(`${baseImport}${mode.codes}`)
    );
  }

  console.info(
    log.success(`
    👊 swagger数据解析完成
  `)
  );

  spinner.stop();
}

function parseDef(def: Record<string, any>, kk?: string) {
  const dependencies = [];
  const result = workUnit(def, kk);

  function workUnit(data, key?: string, noMark?: boolean) {
    if (key && key.includes(".")) return "";

    let res = "";
    if (data.type && isBaseType(data.type)) {
      const type__ = resetTypeName(data.type);
      let $value = "";
      let $description = data.description || "";
      if (key) {
        if (type__ === "string") {
          if (data.default) $value = data.default;
          if (data.enum) $value = `[${data.enum.join(",")}]`;
          if (data.format === "date-time") {
            $value = `#datetime()`;
          }
        }
        const comments = `
        /**
         * ${$description}
         * @value ${$value}
         */
        `;

        return `${comments}${key}${
          data.required === false ? "?" : ""
        }:${type__}${noMark ? "" : " \n"}`;
      } else return type__;
    } else if (data.type === "object" || data.schema?.type === "object") {
      const properties = data.properties || data.schema?.properties;
      if (!properties) {
        if (key) {
          res = `${key}:{}${noMark ? "" : "\n"}`;
        } else {
          res = `{}${noMark ? "" : "\n"}`;
        }
      } else {
        if (!key) res += `{ \n `;

        for (let kk in properties) {
          const item = properties[kk];
          res += workUnit(item, kk);
        }

        if (!key) res += `} ${noMark ? "" : "\n"}`;
      }
    } else if (data.type === "array" || data.schema?.type === "array") {
      const type__ = data.type || data.schema?.type;
      const items__ = data.items || data.schema?.items;
      if (type__ && isBaseType(type__)) {
        res += workUnit(
          {
            ...items__,
            required: data.required,
            description: data.description,
          },
          key,
          true
        );
      } else if (items__ && !isBaseType(type__)) {
        if (items__.properties) res += `{ \n `;
        res += workUnit(
          {
            ...items__,
            required: data.required,
            description: data.description,
            rule: 2,
          },
          key,
          true
        );
        if (items__.properties) res += `} ${noMark ? "" : "\n"}`;
      } else if (data.items?.$ref) {
        const $ref = formatBaseTypeKey(
          data.items?.$ref.replace("#/definitions/", "")
        );
        dependencies.push($ref);
        res += workUnit({ type: $ref }, key, true);
      }
      res += "[] \n ";
    } else if (data.$ref) {
      const comments = `
      /**
       * ${data.description || ""}
       * @rule ${data.rule || ""}
       */
      `;
      const $ref = formatBaseTypeKey(data.$ref.replace("#/definitions/", ""));
      dependencies.push($ref);
      return `${
        key ? `${comments}${key}${data.required === false ? "?" : ""}:` : ""
      }${$ref}${noMark ? "" : " \n "}`;
    } else if (data.schema?.$ref) {
      const comments = `
      /**
       * ${data.description || ""}
       * @rule ${data.rule || ""}
       */
      `;
      const $ref = formatBaseTypeKey(
        data.schema?.$ref.replace("#/definitions/", "")
      );
      dependencies.push($ref);
      return `${
        key ? comments + key + `:${data.required === false ? "?" : ""}` : ""
      }${$ref}${noMark ? "" : " \n "}`;
    }
    return res;
  }

  return {
    codes: result,
    dependencies: dependencies,
  };
}

function isBaseType(d?: string) {
  return !["object", "array"].includes(d);
}

function resetTypeName(type) {
  if (type === "file") return "string";
  if (type === "integer") return "number";
  if (type === "ref") return "string";
  return type;
}

function formatTs(str) {
  return prettier.format(str, {
    ...prettierConfig,
    parser: "typescript",
  });
}

function getRequestTypeName(url: string) {
  const arrUrl = url.split("/").map((item) => {
    // 防止使用 a/${xxId}/abc
    return item.replace("{", "").replace("}", "");
  });

  if (arrUrl.length > 1) {
    let u = `${arrUrl[arrUrl.length - 2]}${wordFirstBig(
      arrUrl[arrUrl.length - 1]
    )}`;

    u = typeNameCache.includes(u) ? u + `1` : u;

    typeNameCache.push(u);

    return u;
  } else {
    return arrUrl[arrUrl.length - 1];
  }
}

function wordFirstBig(str: string) {
  return str.substring(0, 1).toLocaleUpperCase() + str.substring(1);
}

function formatBaseTypeKey(key: string) {
  let res = key;
  const invalidMark = ["（", "）", "，", "=", "(", ")", ","];

  invalidMark.forEach((it) => {
    res = replaceAll(it, "", res);
  });

  res = res.replace(/«/g, "").replace(/»/g, "").replace(/\./g, "a");

  return res;
}

function replaceAll(find, replace, str) {
  var find = find.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  return str.replace(new RegExp(find, "g"), replace);
}

function filterRepeatName(arr = []) {
  const keys = [];
  const newArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (!keys.includes(arr[i].name)) {
      newArr.push(arr[i]);
      keys.push(arr[i].name);
    }
  }

  return newArr;
}
