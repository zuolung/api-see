import { pinyin } from "pinyin-pro";

export function createTypeFileName(swaggerTagName: string) {
  let swaggerTagName_ = swaggerTagName;
  const regInvalidWords = /[\.\,\，\.\-\*\\\/]/g;
  swaggerTagName_ = swaggerTagName_.replace(regInvalidWords, "");

  swaggerTagName_ = pinyin(swaggerTagName_, { toneType: "none" });

  swaggerTagName_ = swaggerTagName_.replace(/\s/g, "");

  return wordFirstSmall(swaggerTagName_)
}

function wordFirstSmall(str: string) {
  return str.substring(0, 1).toLocaleLowerCase() + str.substring(1);
}
