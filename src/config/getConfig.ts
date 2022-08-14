import { join } from "path";
import fs from "fs";
import log from "../log.js";

type Iconfig = {
  /** 请求ts的文件路径 */
  path?: string;
  buildPath?: string;
  buildPort?: number;
  mock?: {
    port?: number;
    baseIntercept?: (params: {
      url: string;
      fieldName: string;
      type: "string" | "number" | "boolean";
      originValue?: any;
    }) => any;
    arrayRule?: (params: {
      url: string;
      fieldName: string;
      originRule?: any;
    }) => string;
  };
  /** 生成请求方法配置 */
  action?: {
    dirPath?: string;
    requestImport?: string;
    requestFnName?: string;
    requestSuffix?: string;
    /** 自定义请求方法 */
    createDefaultModel?: (
      fileName: string,
      data: {
        url: string;
        description: string;
        method: string;
      }[]
    ) => string;
  };
  /** swagger生成请求字段类型 */
  swagger?: {
    url?: string;
    /** 使用到的模块 */
    modules?: string[];
    createTypeFileName: (url: string) => string;
  };
} & Record<string, any>;

export default function getConfig(): Iconfig {
  const configPath = join(process.cwd(), "api.config.js");

  if (fs.existsSync(configPath)) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const apiConfig = require(configPath);
    return apiConfig as Iconfig;
  } else {
    log.warning("根目录找不到api.config.js文件");

    return {
      path: "./src/actions/types",
    };
  }
}
