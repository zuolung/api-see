# 根据swagger生成代码

### 介绍

根据swagger的json可以生成ts类型代码和请求代码

```bash
api-see swagger
```

### 配置

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

生成文件的目录结构如下

```markdown
src
├── api
│ |── aa
| | |── actions
| | └── types
| └── bb
|   |── actions
|   └── types
```

### restfullAPI标准

针对请求参数的处理

- `GET`方法：GET方法通常将参数放在URL的查询参数中。查询参数是以“?”符号分隔URL和参数的，多个参数之间使用“&”符号分隔。
例如：http://example.com/api/resource?param1=value1&param2=value2。GET方法的参数通常是可选的，用于过滤结果或指定条件。

- `PUT`方法：PUT方法将参数放在请求的主体中，使用JSON或其他格式进行序列化。请求的头部需要设置正确的Content-Type，如application/json。在PUT请求中，参数是必需的，因为请求的路径通常指定了要更新的资源，而参数则提供更新的具体数据。

- `POST`方法：POST方法与PUT方法类似，将参数放在请求的主体中，使用JSON或其他格式进行序列化。与PUT方法不同的是，POST请求通常用于创建新的资源，因此请求的路径通常指定了要创建的资源的父资源。与PUT方法相同，POST请求的参数也是必需的。

- `DELETE`方法：DELETE方法通常不需要传递参数，因为它主要用于删除指定的资源。如果要传递参数，可以将其放在URL的查询参数中，但这不是常见的做法。在DELETE请求中，路径通常指定要删除的资源的唯一标识符。

不符合上述规则的请求参数将被省略