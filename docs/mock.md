# mock服务

### 介绍

基于本地的ts文件生成mock服务

```bash
api-see watch --path src/action/typings --mock true
```

### 如何定义请求字段

- `@description`: 接口描述或字段描述
- `@url`: 请求路径
- `@timeout`: 接口延时返回 单位毫秒
- `@introduce`: 接口额外的详细介绍
- `@value`: 基础类型字段的固定 mock 数据, 可以使用 mockjs 规则,规则前缀`@`改为`#`,例如#title、#date('YYYY-MM-DD')
- `@rule`: mock 复杂数据的规则，例如：19-20，生成数组数组 19 条或者 20 条
- 更多 mock 配置，请查看[mockjs](https://www.jianshu.com/p/d812ce349265)

支持外部定义公共类型，例如请求结构，分页数据接口都是可以提取出来，像分页数据可以公共设置为 数据`rule`19-20， total 总数为 39，随机数据取测试页面里的分页功能

> `@value`的优先级大于`@rule`

### mock 服务配置

api.config.js 文件下的 mock 属性, 前端定义接口通过`定义请求字段`的注释来 mock 数据或者拦截 mock 服务的方式，

| 字段          | 描述                   | 类型       | 默认值 |
| ------------- | ---------------------- | ---------- | ------ |
| port          | mock 服务端口          | _number_   | 10099  |
| timeout       | 所有接口延时返回的时间 | _number_   | 0      |
| baseIntercept | 拦截基本类型数据       | _function_ | --     |
| arrayRule     | 拦截数组类型数据       | _function_ | --     |

拦截基本类型数据`mock.baseIntercept`配置案例，[建议按照 mockjs 字符、数字、布尔值 规则 返回](https://www.jianshu.com/p/d812ce349265).

**可以根据字段名称和名称去定义返回的数据**

```js
function baseIntercept(params) {
  // type：string、number、boolean
  // fieldName：字段名称
  // originValue：原有值，swagger枚举类型、formatDate等或手动写的@value注释
  // url：请求路径
  const { type, fieldName, originValue, url } = params;
  if (originValue) return originValue;

  if (type === "string") {
    if (fieldName.includes("name") || fieldName.includes("Name"))
      return "@cname";
    if (fieldName.includes("code") || fieldName.includes("Code"))
      return "@word(4, 6)";
    if (
      fieldName.includes("intro") ||
      fieldName.includes("Intro") ||
      fieldName.includes("Long")
    ) {
      return "@cparagraph(1, 3)";
    }
    return "@ctitle";
  } else if (type === "number") {
    if (fieldName.includes("Id") || fieldName.includes("id")) {
      return "@integer(99, 100000)";
    }

    return 1;
  } else if (type === "boolean") {
    if (fieldName === "success") return true;
    return Math.random() > 0.5 ? true : false;
  }
}
```

拦截数组类型数据`mock.arrayRule`配置案例， [建议按照 mockjs 数组 规则 返回](https://www.jianshu.com/p/d812ce349265)

```js
function arrayRule(params) {
  const { type, fieldName, url } = params;
  // 随机19-20条数组
  if (fieldName === "list") return "19-20";
}
```