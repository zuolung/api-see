/* eslint-disable import/no-named-as-default */
import path_ from "path";
import fs from "fs";
import glob from "glob";
import { watch } from "chokidar";
import parser from "./parser.js";
import log from "./log.js";
import * as ora from "ora";

const CWD = process.cwd();

export function workFile(targetUrl: string) {
  const result: any = {};
  const spinner = ora.default();

  return new Promise((resolve) => {
    glob(`${targetUrl}/*.ts`, async (err, paths: string[]) => {
      if (err) {
        log.error(err.toString());
        process.exit(1);
      }
      paths.forEach((p) => {
        const parseRes = parser(p);
        const fileArr = p.split("/");
        const fileName = fileArr[fileArr.length - 1]?.replace(".ts", "");
        if (parseRes && fileName) {
          const def = parseRes.definitions;
          result[fileName] = def;
        }
        spinner.info(log.success(`解析接口模块: ${p}`));
      });

      if (!fs.existsSync(path_.join(CWD, "./.cache"))) {
        await fs.mkdirSync(path_.join(CWD, "./.cache"));
      }

      await fs.writeFileSync(
        path_.join(CWD, "./.cache/api-ui-data.json"),
        JSON.stringify(result)
      );

      resolve(true);
    });
  });
}

type Iprops = {
  path?: string;
  watch?: boolean;
};

export default async function file(props: Iprops) {
  const { path = "src/actions/types", watch = false } = props;
  const targetUrl = path_.join(CWD, path);
  await workFile(targetUrl);
  if (watch) {
    watchAction(targetUrl, workFile);
  }
}

function watchAction(targetUrl: string, work: (p: string) => void) {
  let readyOk = false;
  const watcher = watch(targetUrl, {
    persistent: true,
  });
  watcher.on("ready", function () {
    readyOk = true;
  });
  watcher.on("add", function () {
    if (readyOk) work(targetUrl);
  });
  watcher.on("change", function () {
    if (readyOk) work(targetUrl);
  });
  watcher.on("unlink", function () {
    if (readyOk) work(targetUrl);
  });
}
