import YAML from "js-yaml";
import fetch from "node-fetch";
import * as JSON_ from 'jsonc-parser'

export function fetchData(url: string) {
  return new Promise((resolve) => {
    fetch(url)
      .then((resp) => resp.text())
      .then((contents) => {
        console.info(contents, '>>>????', url)
        contents = contents.replace(/\:\/\//g, '')
        const res = parseFileContents(contents, url);
        resolve(res);
      });
  });
}

function parseFileContents(contents: string, path: string): object {
  const res = /.ya?ml$/i.test(path)
    ? YAML.load(contents)
    : JSON_.parse(contents);
  return res;
}
