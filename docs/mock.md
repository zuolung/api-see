# Ts代码生成mock服务

### 介绍

基于本地的ts文件生成mock服务

```bash
api-see watch --path src/action/typings --mock true
```

### 如何定义请求字段

- `普通注释`: 接口描述或字段描述
- `@url`: 请求路径
- `@timeout`: 接口延时返回 单位毫秒
- `@introduce`: 接口额外的详细介绍
- `@value`: 基础类型字段的固定 mock 数据, 可以使用 mockjs 规则,规则前缀`@`改为`#`,例如#title、#date('YYYY-MM-DD')
- `@rule`: mock 复杂数据的规则，例如：19-20，生成数组数组 19 条或者 20 条
- 更多 mock 配置，请查看[mockjs](https://www.jianshu.com/p/d812ce349265)

支持外部定义公共类型，例如请求结构，分页数据接口都是可以提取出来，像分页数据可以公共设置为 数据`rule`19-20， total 总数为 39，随机数据取测试页面里的分页功能


支持外部定义公共类型，例如请求结构，分页数据接口都是可以提取出来，像分页数据可以公共设置为 数据rule19-20， total 总数为 39，随机数据取测试页面里的分页功能

### 代码案例

```typescript
/**
 * 获取用户列表信息
 * @url /z/common/user/list
 * @introduce 这是请求所有用户数据的接口
 * @timeout 1000
 * @method GET
 */
export type userInfo = {
  request: {
    /**
     * 每页数据数量
     **/
    pageSize: number;
    /**
     * 第几页
     **/
    pageNum: number;
  };
  response: {
    /**
     * 成功
     **/
    success: boolean;
    data: {
      /**
       * 用户总数
       * @value 39
       **/
      total: number;
      /**
       * 用户列表
       * @rule 19-20
       **/
      list: {
        /**
         * 用户拥有的角色， 《注意字符需要双引号》
         * @value ["运营", "HR", "销售"]
         **/
        roles: string[];
        /**
         * 用户名称
         * @value #title
         **/
        userName: string;
        /**
         * 枚举值字符 《注意字符需要双引号》
         * @value ["状态1", "状态2"]
         **/
        someone: string;
        /**
         * 枚举值数字
         * @value [1, 2]
         **/
        someNum: number;
      }[];
    };
  };
};
```