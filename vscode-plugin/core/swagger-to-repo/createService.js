// @ts-nocheck
const { writeFileSync } = require("fs");
const { resolve } = require("path");
const { tsTypeParse, formatTs, getActiveFileName, getSwaggerConfig } = require("../common");

function createService(file, noWrite) {
  const config = getSwaggerConfig()
  const make = config?.makeService || defaultMakeService
  const fileArr = file.split("/");
  const fileNameOrigin = fileArr[fileArr.length - 1]?.replace(".ts", "");
  const fileName = toCamel(fileArr[fileArr.length - 1]?.replace(".ts", ""));
  const fileNameCamel = firstWordUp(fileName);
  const def = tsTypeParse(file).definitions;

  const code = make({
    fileNameCamel,
    def,
    fileNameOrigin,
  });

  const target = resolve(getActiveFileName(), `../../${fileNameOrigin}.ts`);

  if (!noWrite) writeFileSync(target, formatTs(code));

  return formatTs(code)
}

function defaultMakeService({ def, fileNameOrigin, fileNameCamel }) {
  let IMPORT_TYPES = [];
  let SERVICES = "";
  let code = `/* eslint-disable */
// @ts-nocheck
import { utils } from '@dian/dn'
IMPORT_TYPES
const { RemoteService } = utils

export class ${fileNameCamel}Service extends RemoteService {
	readonly name: string = '${fileNameCamel}'

	SERVICES
}
	`;
  for (const key in def) {
    const item = def[key];
    // @ts-ignore
    if (key.includes("Record<string") || !item.url || !item.method) continue;
    IMPORT_TYPES.push(key);
    // @ts-ignore
    const method = item.method;
    // @ts-ignore
    const description = item.description || "--";
    // @ts-ignore
    const url = item.url;
    let responseTT = "";
    if (
      item?.properties?.response?.type === "object" &&
      item?.properties?.response?.properties?.data
    ) {
      responseTT = `<${key}['response']['data']>`;
    }

    SERVICES += `// ${description} \n`;
    SERVICES += `async ${key}Service (params: ${key}['request']) {
			const { data } = await this.${method}${responseTT}('${url}', { params })
			return data
		}\n\n`;
  }

  code = code.replace(
    "IMPORT_TYPES",
    `import type { ${IMPORT_TYPES.join(
      ","
    )} } from './typings/${fileNameOrigin}'`
  );
  code = code.replace("SERVICES", SERVICES);

  return code;
}

function firstWordUp(s) {
  return s.substring(0, 1).toLocaleUpperCase() + s.substring(1);
}

function toCamel(str) {
  return str
    .replace(/([^\-])(?:\-+([^\-]))/g, function (_, $1, $2) {
      return $1 + $2.toUpperCase();
    })
    .replace(/([^\.])(?:\.+([^\.]))/g, function (_, $1, $2) {
      return $1 + $2.toUpperCase();
    });
}

module.exports = {
  createService,
};
