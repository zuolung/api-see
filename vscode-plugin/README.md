# api-see vscode插件

将指定的swagger模块或者接口，转换为ts文件和请求方法文件

### 功能

swagger json转ts类型:

- 输入`#11`触发菜单选择，将指定swagger模块转换为ts类型文件和请求方法文件
- 输入`#22`触发菜单选择，将指定swagger接口转换为ts类型文件和请求方法文件

ts类型生成请求方法，在请求方法文件中输入`#33`，根据相对文件路径`./typings/${当前文件名称}`生成请求方法

### 要求

根目录配置api.config.js文件

```js
module.exports = {
  swaggers: {
    shop: 'http://xxxswagger.com',
    order: 'http://xxxswagger.com',
  },
  // 默认生成的服务配置, ts描述、文件名称、文件名称转驼峰
  markeService: function ({ def, fileNameOrigin, fileNameCamel }) {
    let IMPORT_TYPES = [];
    let SERVICES = "";
    let code = `/* eslint-disable */
  // @ts-nocheck
  import { utils } from '@dian/dn'
  IMPORT_TYPES
  const { RemoteService } = utils
  
  export class ${fileNameCamel}Service extends RemoteService {
    readonly name: string = '${fileNameCamel}'
  
    SERVICES
  }
    `;
    for (const key in def) {
      const item = def[key];
      // @ts-ignore
      if (key.includes("Record<string") || !item.url || !item.method) continue;
      IMPORT_TYPES.push(key);
      // @ts-ignore
      const method = item.method;
      // @ts-ignore
      const description = item.description || "--";
      // @ts-ignore
      const url = item.url;
      let responseTT = "";
      if (
        item?.properties?.response?.type === "object" &&
        item?.properties?.response?.properties?.data
      ) {
        responseTT = `<${key}['response']['data']>`;
      }
  
      SERVICES += `// ${description} \n`;
      SERVICES += `async ${key}Service (params: ${key}['request']) {
        const { data } = await this.${method}${responseTT}('${url}', { params })
        return data
      }\n\n`;
    }
    // 生成请求文件的路径是固定的，所有事下面./typings/xx固定的引用路径
    code = code.replace(
      "IMPORT_TYPES",
      `import type { ${IMPORT_TYPES.join(
        ","
      )} } from './typings/${fileNameOrigin}'`
    );
    code = code.replace("SERVICES", SERVICES);
  
    return code;
  }
}

```

### 使用

再ts文件头部添加注释：
```ts
/**
 * @swagger shop
 */
```

然后换行输入 `#11`或者`#22`

生成ts的结构如下：
```ts
/**
 * shopList
 * @url /test/shopList
 * @method get
 * @introduce --
 */
export type ItestTestShopList = {
  request: {
    /**
     * @description contractId
     */
    contractId: number
  }
  response: number
}
```