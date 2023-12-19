import getConfig from "../config/getConfig.js";
import log from "../log.js";
import { transform } from "./transform.js";
import { fetchData } from "./fetch.js";
import { Iconfig } from "global.js";
import { join } from 'path'
import { existsSync } from 'fs'

type Iprops = {
  dir?: string;
};

export default async function swagger(props: Iprops) {
  let { dir } = props;
  if (!dir) {
    console.info(log.error(`缺少dir选项`))
    process.exit(1)
  }
  dir = dir.startsWith('/') ? dir : join(process.cwd(), dir)
  if (!existsSync(dir)) {
    console.info(`${dir}路径不存在`)
    process.exit(1)
  }
  const config = getConfig();
  // 业务模块中用到的xx服务下的xxx接口
  const apiUrlsPath = join(dir, './swagger.json')
  if (!existsSync(apiUrlsPath)) {
    console.info(log.error(`缺少文件${apiUrlsPath}`))
    process.exit(1)
  }
  const apiUrls = require(apiUrlsPath) || {}
  let swaggerConfig = config?.swagger?.services

  for (let i =0; i< swaggerConfig.length; i++) {
    const item = swaggerConfig[i]
    const currentUrls = apiUrls[item.serviceName] || []
    if (currentUrls.length) {
      await unitWork({
        url: item.url,
        serviceName: item.serviceName,
        path: dir,
        actionConfig: config.action,
        apiUrls: apiUrls[item.serviceName] || [],
      })
    }
  }

  if (swaggerConfig.length > 1) console.info(log.success(`所有服务解析完成`));
}

type WorkProps = {
  url?: string
  serviceName?: string
  path?: string
  actionConfig?: Iconfig['action']
  apiUrls: string[]
}

async function unitWork({
  url,
  actionConfig,
  path,
  serviceName,
  apiUrls,
}: WorkProps) {
  if (!url) {
    log.error("can not get swagger url");
    return;
  }

  console.info(log.tips(`开始获取 【${serviceName}】 swagger数据`));

  const swaggerData: any = await fetchData(url);
  const swaggerVersion = swaggerData["swagger"] || swaggerData["openapi"];

  console.info(
    log.success(`
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ ${serviceName} swagger data                             
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ 🔌 请求JSON路径: ${url}
+ 🚀 swagger版本: ${swaggerVersion}                                             
+ 🚗 接口数: ${Object.keys(swaggerData["paths"]).length}           
+ 🐎 转换的接口数量：${apiUrls.length}
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
`)
  );
  await transform(swaggerData, path, apiUrls, serviceName, actionConfig);
  const allUrls = Object.keys(swaggerData.paths)
  let unFindUrl = apiUrls.filter((it) => {
    return !allUrls.includes(it)
  })

  if (unFindUrl && unFindUrl.length) {
    console.info(log.warning(`有${unFindUrl.length}个接口未查询到:`))
    unFindUrl.forEach(it => {
      console.info(log.tips(`1.   ${it}`))
    })
    console.info(`
    `)
  }
}