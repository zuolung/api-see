# Ts代码生成在线文档

### 介绍

提供命令行根据本地的 ts 类型生成在线 API 文档

本地环境打包

```bash
api-see watch --path src/action/typings --server true
```

测试环境打包

```bash
api-see build --path src/action/typings
```

### ts 代码规范

```typescript
/**
 * 获取用户列表信息
 * @url /z/common/user/list
 * @introduce 这是请求所有用户数据的接口
 * @method GET
 */
export type userInfo = {
  request: {
    /**
     * @description 每页数据数量
     **/
    pageSize: number;
    /**
     * @description 第几页
     **/
    pageNum: number;
  };
  response: {
    /**
     * @description 成功
     **/
    success: boolean;
    data: {
      /**
       * @description 用户总数
       **/
      total: number;
      /**
       * @description 用户列表
       **/
      list: {
        /**
         * @description 用户拥有的角色
         **/
        roles: string[];
        /**
         * @description 用户名称
         **/
        userName: string;
      }[];
    };
  };
};
```

### 相关配置

配置文件根目录下 api.config.(ts)js 文件

| 字段      | 描述                        | 类型     | 默认值                |
| --------- | --------------------------- | -------- | --------------------- |
| path      | 请求字段类型所在的文件路径` | _string_ | "./src/actions/types" |
| buildPath | 接口文档打包路径            | _string_ | "./api-ui"            |
| buildPort | 接口文档开发环境服务端口    | _number_ | 7878                  |

### 将文档 UI 应用到测试环境

开发环境只需要开启 `api-see watch --path ./src/actions/types --mock true --action true`
正式打包则使用 `api-see file`, 再执行本地项目的构建

```jsx
import { ApiUi } from "api-see";
// 默认当前项目生成接口文档数据，.gitignore文件加上 .cache
import apiData from "@/../.cache/api-ui-data.json";
import "api-see/ui/app.less";

export default function Index(): React.ReactNode {
  return <ApiUi title="crm接口文档" mockPort={10998} apiData={apiData} />;
}
```

> 由于api-ui-data是临时文件，注意屏蔽eslint错误