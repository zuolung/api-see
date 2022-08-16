import { transform } from "./transform.js";
import { fetchData } from "./fetch.js";
import getConfig from "../config/getConfig.js";
import { createTypeFileName } from "./createTypeFileName.js";
import log from "../log.js";
import file from "../file";

type Iprops = {
  url?: string;
  path?: string;
};

export default async function swagger(props: Iprops) {
  const { path = "src/actions/types" } = props;
  const config = getConfig();
  const url = props.url || config?.swagger?.url;
  const path_ = path || config?.path;
  const modules = config?.swagger?.modules;
  if (!url) {
    log.error("can not get swagger url");
    return;
  }

  console.info(log.tips("开始获取swagger数据"));

  const swaggerData = await fetchData(url);

  console.info(
    log.success(`
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
swagger data                                                    +
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ 🚀 swagger版本: ${swaggerData["swagger"]}                        
+ 🚴‍♀️ 接口模块数: ${swaggerData["tags"].length}                      
+ 🚗 接口数: ${Object.keys(swaggerData["paths"]).length}           
+ 🚄 公共类型数: ${Object.keys(swaggerData["definitions"]).length}  
+ 🐘 执行模块: ${modules ? modules.join(`, `) : "所有模块"}          
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
`)
  );
  await transform(swaggerData, path_, modules, createTypeFileName);

  setTimeout(() => {
    file({
      path: path_,
      action: true,
      forceUpdate: true,
    });
  });
}
