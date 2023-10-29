import YAML from "js-yaml";
import fetch from "node-fetch";
import * as JSON_ from 'jsonc-parser'
import log from "../log";

export function fetchData(url: string) {
  return new Promise((resolve) => {
    fetch(url)
      .then((resp) => resp.text())
      .then((contents) => {
        contents = contents.replace(/\:\/\//g, '')
        const res = parseFileContents(contents, url);
        resolve(res);
      }).catch((err) => {
        console.info(`${url}swaggerJSON请求报错:`)
        console.info(log.error(err))
      });
  });
}

function parseFileContents(contents: string, path: string): object {
  const res = /.ya?ml$/i.test(path)
    ? YAML.load(contents)
    : JSON_.parse(contents);
  return res;
}
