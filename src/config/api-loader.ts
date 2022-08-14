import { join } from "path";
import getConfig from "./getConfig.js";

const apiConfig = getConfig();
const { port } = apiConfig?.mock || {};

export default function apiLoader(source) {
  this.cacheable = false;
  const CWD = process.cwd();
  const callback = this.async();

  if (source.includes("API_DATA_IMPORT")) {
    source = source
      .replace(
        "/** API_DATA_IMPORT */",
        `import ApiData from "${join(CWD, "./.cache/api-ui-data.json")}"`
      )
      .replace(`/** API_DATA_USE */`, `apiData={ApiData} mockPort={${port}}`);
  }

  callback(null, source);
}
