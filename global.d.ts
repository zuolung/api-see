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
          /** 请求参数是否是空的 */
          requestNull?: boolean;
          /** 响应体是否有data字段 */
          hasResponseData?: boolean;
          /** 请求方式是否有query */
          hasRequestQuery: boolean,
          /** query字段，如：{id} */
          queryKey?: string,
        }
      >;
      fileName: string;
    }) => string;
  };
  /** swagger生成请求字段类型 */
  swagger?: {
    /** 所有服务对应ts类型和请求的最外层文件夹, 默认为src/actions */
    dir?: string
    services: {
      /** swagger JSON 路径 */
      url: string;
      /** 服务名称，可以拼接到请求路径前 */
      serviceName: string;
    }[];
  }
};
