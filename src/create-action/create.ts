/* eslint-disable import/no-named-as-default */

export function createDefaultModel({
  requestImport = "import { createFetch } from '@/utils/request'",
  requestFnName = "createFetch",
  fileName = "a",
  data = {},
  requestSuffix = "Action",
}) {
  const packages: string[] = [];
  let requestActionsStr = "";

  for (const key in data) {
    const item = data[key];
    console.info(item?.hasResponseData, '~~~~~~~~~~~~~~~~~~~~~~~~')

    if (key !== "Record<string,any>" && item.url && item.description) {
      packages.push(key);
      requestActionsStr += `
      /* ${item.description} **/
      export const ${key}${requestSuffix} = ${requestFnName}<${key}['request'], ${key}['response']>('${item.url}', '${item.method}');
      `;
    }
  }

  const packagesStr = packages.join(",");

  return `
  /* eslint-disable import/no-cycle */
  // @ts-nocheck
  ${requestImport}
  import type { ${packagesStr} } from '../types/${fileName}';

  ${requestActionsStr}
  `;
}
