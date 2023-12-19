# 根据swagger生成代码

### 介绍

根据swagger的json可以生成ts类型代码和请求代码, service-name,只转换配置项里面的某个swagger服务

```bash
api-see swagger --dir src/pages/aa/api
```

### 配置
- dir: 请求ts类型和请求方法最外层的文件路径
- service： 请求swagger服务名称、swaggerJSON路径url、modules需要的模块，不传则转换所有

```ts
import type { Iconfig } from 'api-see'

const config: Iconfig = {
  swagger: {
    dir: 'src/api',
    services: [
      {
        serviceName: 'aa',
        url: 'http://xxxxxxx',
      },
      {
        serviceName: 'bb',
        url: 'http://xxxxxxx',
      },
    ]
  }
}
```
在目标路径`src/pages/aa/api`下配置`swagger.json`文件, `服务名称: urlString[]`

```json
{
  "aa": [
    "/shop/device/lost/v2/confirm",
  ],
}
```

然后执行命令`api-see swagger --dir src/pages/aa/api`生成文件的目录结构如下

```markdown
src
├── pages
│ |── aa
   |── api
     |── swagger.json
     |── aa-action.ts
     └── aa-types.ts
```

> action为请求方法，types为请求类型

### 请求类型标准

- 请求字段的名称由url驼峰拼接而成
- `query`格式的请求在请求方法拼接的配置函数中有`requestNull`标识

```ts
/**
 * deviceGroupFixIsCoreData
 * @url /device/group/deviceGroupFixIsCoreData/{groupId}
 * @method post
 * @introduce --
 */
export type DeviceGroupDeviceGroupFixIsCoreDataGroupId = {
  request: undefined

  response: {.....}
}
```

### restfullAPI标准

针对请求参数的处理

- `GET`方法：GET方法通常将参数放在URL的查询参数中。查询参数是以“?”符号分隔URL和参数的，多个参数之间使用“&”符号分隔。
例如：http://example.com/api/resource?param1=value1&param2=value2。GET方法的参数通常是可选的，用于过滤结果或指定条件。

- `PUT`方法：PUT方法将参数放在请求的主体中，使用JSON或其他格式进行序列化。请求的头部需要设置正确的Content-Type，如application/json。在PUT请求中，参数是必需的，因为请求的路径通常指定了要更新的资源，而参数则提供更新的具体数据。

- `POST`方法：POST方法与PUT方法类似，将参数放在请求的主体中，使用JSON或其他格式进行序列化。与PUT方法不同的是，POST请求通常用于创建新的资源，因此请求的路径通常指定了要创建的资源的父资源。与PUT方法相同，POST请求的参数也是必需的。

- `DELETE`方法：DELETE方法通常不需要传递参数，因为它主要用于删除指定的资源。如果要传递参数，可以将其放在URL的查询参数中，但这不是常见的做法。在DELETE请求中，路径通常指定要删除的资源的唯一标识符。

不符合上述规则的请求参数将被省略，其他请求方法默认从`body`里面取

- 一个url对应多个请求的时候，只会解析第一个请求，如果有url对应多个请求,生成的请求方法达不到预期,请自行创建特殊请求和请求方法的映射关系如下，在[action.createDefaultModel](/#/create-action)组装请求方法的时候过滤下

```ts
// 如遇到 'a/b/c'这个请求有多种请求方法，可以在createDefaultModel中过滤出来，选择生成多个，或者生成需要的方法的请求
const specialUrl = {
  'a/b/c': 'post'
}
```

### 生成代码的格式化

项目根目录配置`.prettierrc`文件， 默认的配置如下

```ts
{
  semi: false
  singleQuote: true
  trailingComma: 'all'
}
```