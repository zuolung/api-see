import { DefinitionOrBoolean } from "typescript-json-schema";

declare module "glob";
declare module "ora";
declare module "*.json" {
  const value: any;
  export default value;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "production" | "development";
  }
}

export type Iconfig = {
  /** 请求ts的文件路径 */
  path?: string;
  /** 接口文档标题 */
  title?: string;
  /** 打包文件路径 */
  buildPath?: string;
  /** 本地文档服务端口 */
  buildPort?: number;
  mock?: {
    /** 统一设置接口的延时返回 */
    timeout?: number;
    port?: number;
    /** 基础类型拦截 */
    baseIntercept?: (params: {
      url: string;
      fieldName: string;
      type: "string" | "number" | "boolean";
      originValue?: any;
    }) => any;
    /** 数组类型拦截 */
    arrayRule?: (params: {
      url: string;
      fieldName: string;
      originRule?: any;
    }) => string;
  };
  /** 生成请求方法配置 */
  action?: {
    /** 请求方法的路径 */
    dirPath?: string;
    /** 请求方法引入包名 */
    requestImport?: string;
    /** 请求方法名称 */
    requestFnName?: string;
    /** 请求前缀 */
    requestSuffix?: string;
    /** 自定义请求方法 */
    // createDefaultModel?: (params: {
    //   /** 请求类型的ast描述, key是某个接口的名称，由url路径组合而成 */
    //   data: Record<string, {
    //     /** 请求路径 */
    //     url: string
    //     /** 请求描述 */
    //     description: string
    //     /** 请求方法 */
    //     method: string
    //     /** 介绍 */
    //     introduce: string
    //     /** 服务名称 */
    //     serviceName?: string
    //     /** 返回和请求的字段类型描述 */
    //     properties: {}
    //   }>;
    createDefaultModel?: (params: {
      /** 请求类型的ast描述, key是某个接口的名称，由url路径组合而成 */
      data: Record<
        string,
        {
          /** 请求路径 */
          url: string;
          /** 请求描述 */
          description: string;
          /** 请求方法 */
          method: string;
          /** 介绍 */
          introduce: string;
          /** 服务名称 */
          serviceName?: string;
        } & DefinitionOrBoolean
      >;
      fileName: string;
      requestImport?: string;
      requestFnName?: string;
      serviceName?: string;
      requestSuffix?: string;
    }) => string;
  };
  /** swagger生成请求字段类型 */
  swagger?:
    | {
        /** swagger JSON 路径 */
        url: string;
        /** 使用到的模块 */
        modules: string[];
        /** 服务名称，可以拼接到请求路径前 */
        serviceName: string;
      }
    | {
        url: string;
        modules: string[];
        serviceName: string;
      }[];
};
