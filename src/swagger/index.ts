import getConfig from "../config/getConfig.js";
import log from "../log.js";
import { transform } from "./transform.js";
import { fetchData } from "./fetch.js";
import { Iconfig } from "global.js";

type Iprops = {
  dir?: string;
};

export default async function swagger(props: Iprops) {
  const { dir } = props;
  const config = getConfig();
  const path_ = dir || config?.swagger.dir || "src/actions";
  let swaggerConfig = config?.swagger?.services

  for (let i =0; i< swaggerConfig.length; i++) {
    const item = swaggerConfig[i]
    await unitWork({
      url: item.url,
      modules: item.modules,
      serviceName: item.serviceName,
      path: path_,
      actionConfig: config.action
    })
  }

  if (swaggerConfig.length > 1) console.info(log.success(`所有服务解析完成`));
}

type WorkProps = {
  url?: string
  modules?: string[]
  serviceName?: string
  path?: string
  actionConfig?: Iconfig['action']
}

async function unitWork({
  url,
  actionConfig,
  path,
  serviceName,
  modules
}: WorkProps) {
  if (!url) {
    log.error("can not get swagger url");
    return;
  }

  console.info(log.tips(`开始获取 【${serviceName}】 swagger数据`));

  const swaggerData: any = await fetchData(url);
  const swaggerVersion = swaggerData["swagger"] || swaggerData["openapi"];
  const publicTypes =
    swaggerData["definitions"] || swaggerData["components"]["schemas"];

  console.info(
    log.success(`
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ ${serviceName} swagger data                                                    +
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ 🚀 swagger版本: ${swaggerVersion}                        
+ 🚴‍♀️ 接口模块数: ${swaggerData["tags"].length}                      
+ 🚗 接口数: ${Object.keys(swaggerData["paths"]).length}           
+ 🚄 公共类型数: ${Object.keys(publicTypes).length}  
+ 🐘 执行模块: ${modules && modules.length ? modulesShow(modules) : "所有模块"}          
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
`)
  );
  await transform(swaggerData, path, modules, serviceName, actionConfig);
}

function modulesShow(names) {
  let res = ''
  for (let i = 0; i < names.length; i++) {
    res += names[i] + `, `
    if (i % 3 === 0) {
      res += `\n  `
    }
  }

  return res
}