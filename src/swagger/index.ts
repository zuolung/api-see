import getConfig from "../config/getConfig.js";
import log from "../log.js";
import { transform } from "./transform.js";
import { fetchData } from "./fetch.js";
import { Iconfig } from "global.js";

type Iprops = {
  url?: string;
  path?: string;
  modules?: string;
  action?: boolean;
  serviceName?: string
};

export default async function swagger(props: Iprops) {
  const { path, modules, action, serviceName, url } = props;
  const config = getConfig();
  const path_ = path || config?.path || "src/actions/types";
  let swaggerConfig: WorkProps[] = []
  if (props.url) {
    if (!serviceName) {
      return console.info(log.error(`当前版本必须配置serviceName`));
    }
    swaggerConfig.push({
      url,
      path,
      serviceName, 
      modules: modules?.split(',') || []
    })
  } else if (config.swagger) {
    if (Array.isArray(config.swagger)) {
      swaggerConfig = config.swagger
    } else {
      swaggerConfig = [config.swagger]
    }
  }

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
+ 🐘 执行模块: ${modules ? modules.join(`, `) : "所有模块"}          
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
`)
  );
  await transform(swaggerData, path, modules, serviceName, actionConfig);
}