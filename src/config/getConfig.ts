import { join } from "path";
import fs from "fs";
import log from "../log.js";
import { Iconfig } from '../../global.js'
import { register } from '@adonisjs/require-ts'

let ifWarned = false;

const appRoot = join(__dirname,'../../config')


register(appRoot, {})

export default function getConfig(): Iconfig {
  const configPath = join(process.cwd(), "api.config.js");
  const TsConfigPath = join(process.cwd(), "api.config.ts");

  if (fs.existsSync(TsConfigPath)) {
    const apiConfig = require(TsConfigPath).default;
    return apiConfig as Iconfig;
  } else if (fs.existsSync(configPath)) {
    const apiConfig = require(configPath).default;
    return apiConfig as Iconfig;
  } else {
    if (!ifWarned) {
      log.warning("根目录找不到api.config.js(ts)文件");
      ifWarned = true;
    }
    return {
      path: "./src/actions/types",
    };
  }
}