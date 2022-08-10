import YAML from "js-yaml";
import fetch from "node-fetch";

export function fetchData(url: string) {
  return new Promise((resolve) => {
    fetch(url)
      .then((resp) => resp.text())
      .then((contents) => {
        const res = parseFileContents(contents, url);
        resolve(res);
      });
  });
}

function parseFileContents(contents: string, path: string): object {
  const res = /.ya?ml$/i.test(path)
    ? YAML.load(contents)
    : JSON.parse(contents);
  return res;
}
