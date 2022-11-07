declare module "glob";
declare module "ora";
declare module "*.json" {
  const value: any;
  export default value;
}

// 定义接口的方案类型：前端代码定义、服务端swagger定义
type IApiType = "FRONT" | "SWAGGER";
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "production" | "development";
  }
}
