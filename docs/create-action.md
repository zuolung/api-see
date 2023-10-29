# 创建请求方法

### 介绍

在创建ts类型的同时创建请求方法，请求方法和类型不能在同一层级的文件下

### 配置

| 字段               | 描述                 | 类型       | 默认值                                         |
| ------------------ | -------------------- | ---------- | ---------------------------------------------- |
| dirPath            | 相对ts类型文件的路径,建议使用默认   | _string_   | "..actions"      |
| createDefaultModel | 定义请求方法的结构   | _function_ | `createDefaultModel`                           |

`createDefaultModel`回调函数的参数：
- fileName：对应ts请求类型的文件名称
- data对象的key是请求路径拼接的
- data[key].hasRequestQuery判断当前url中是否存在query
- data[key].hasResponseData判断当前请求是否存在`data`字段

```ts
import type { Iconfig } from 'api-see'

const config: Iconfig = {
  action: {
    createDefaultModel ({
      data,
      fileName,
    }) {
      const IMPORT_TYPES: string[] = []
      let SERVICES = ''
      let code = `
    /* eslint-disable space-before-function-paren */
    import { zApi } from '@dian/app-utils'
    IMPORT_TYPES
    
    SERVICES
      `
      for (const key in data) {
        const item = data[key]

        if (key.includes('Record<string') || !item.url || !item.method) continue
        IMPORT_TYPES.push(key)
        const method = item.method
        const description = item.description || '--'
        const url = `/${item.serviceName}${item.url}`
        let responseTT = ''
        if (item?.hasResponseData) {
          responseTT = `<${key}['response']['data']>`
        }
        let ifQueryReplace = ''
        let queryParams = ''
        if (item.hasRequestQuery) {
          ifQueryReplace = `.replace("${item.queryKey}", query)`
          queryParams = ',query:string'
        }

        SERVICES += `/** ${description} */ \n`
        SERVICES += `export async function ${key}Service (params: ${key}['request'] ${queryParams}) {
          const data = await zApi.${method}${responseTT}('${url}'${ifQueryReplace}, ${item.method === 'get' ? '{ params }' : 'params'} )
          return data
        }\n\n`
      }

      code = code.replace(
        'IMPORT_TYPES',
        `import type { ${IMPORT_TYPES.join(
          ',',
        )} } from '../types/${fileName}'`,
      )
      code = code.replace('SERVICES', SERVICES)

      return code
    },
  },
}

export default config
```