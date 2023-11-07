# api-see 是什么？

`api-see` 是日常开发中接口的效率化工具。

###
![image](https://raw.githubusercontent.com/zuolung/api-ui-demo/main/theme.png)

- 代码自动化转化为接口文档，代码和文档完全保持一致
- 自动生成请求方法
- 本地生成 mock 服务，提升联调效率
- 根据后端 swagger 文档生成接口请求字段类型

### 安装

```
yarn add api-see
```

接口定义的方案可以分为 `前端ts文件定义接口` 和 `后端swagger定义接口`, 通过`api-see`工具我们可以快速实现代码自动化 和数据自动化

### 快速开始

##### 前端 ts 文件定义接口

- `api-see watch`: 监听请求字段类型文件，生成 描述接口文档 的数据，`server`本地文档服务,`mock`开启 mock 服务, `action`根据请求字段类型生成请求方法
- `api-see build`: 接口文档单独打包
- `api-see file`: 执行一次生成 描述接口文档 的数据, 应用场景：1.刚拉取业务项目初始化、2.仅想重新生成一次请求方法

```json
{
  "scripts": {
    // ...
    "api:watch": "api-see watch --path ./src/actions/types --server true --mock true --action true",
    "api:build": "api-see build --path ./src/actions/types",
    "api:file": "api-see file --path ./src/actions/types --action true",
    "build": "yarn build & yarn api:build"
  }
}
```

接口文档单独打包`yarn build`, nginx 静态服务的情况下，建议通过`buildPath`配置打包的目录结构如下

```
- build （项目打包文件）
  - index.html
  ......
  - api-see (api-see打包的结果，可以通过配置文件配置打包路径)
```

##### 服务端 swagger 定义接口

- `api-see swagger`: 生成请求字段类型和请求方法
- `api-see:xxx`: 只生成xxx服务的请求类型和方法

```json
{
  "scripts": {
    "swagger": "api-see swagger --dir ./src/api",
    "swagger:xxx": "api-see swagger --service-name xxx"
  }
}
```

### 推荐的文件目录结构

生成文件的目录结构如下

```markdown
src
├── api
| |── actions
| └── types

