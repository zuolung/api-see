const YAML = require("js-yaml");
const fetch = require("node-fetch");
const vscode = require("vscode");

const ProgressLocation = vscode.ProgressLocation;
const progressOptions = {
  location: ProgressLocation.Notification, // 在通知栏显示
  title: 'swagger数据加载中...',
  cancellable: false, // 是否可取消
};
const TIME_OUT = 10 * 1000

function fetchData(url) {
  const AbortController = global.AbortController;
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, TIME_OUT);
  console.info("###################### swagger fetch ######################");
  return new Promise(async (resolve) => {
    try {
      // @ts-ignore
      // 显示进度条
      await vscode.window.withProgress(progressOptions, async () => {
        // @ts-ignore
        const data = await fetch(url, {
          signal: controller.signal,
        })
          .then((resp) => resp.text())
          .then((contents) => {
            const res = parseFileContents(contents, url);
            return res;
          });
          resolve(data)
      });

  
    } catch (err) {
      if (err.type === 'aborted') {
        vscode.window.showErrorMessage("swagger-repo: swagge json请求超时");
      } else {
        vscode.window.showErrorMessage("swagger-repo: swagge json请求错误");
      }
    } finally {
      clearTimeout(timeout);
    }
  }) 
}

function parseFileContents(contents, path) {
  const res = /.ya?ml$/i.test(path)
    ? YAML.load(contents)
    : JSON.parse(contents);
  return res;
}

module.exports = {
  fetchData,
};
