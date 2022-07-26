import path from "path";
import fs from "fs";
import type { Options } from "prettier";

let evalTemp = {
  semi: false,
  singleQuote: true,
  trailingComma: "all",
};

export function getPrettierConfig(): Promise<Options | Record<string, any>> {
  return new Promise((resolve) => {
    const prettierPath = path.join(process.cwd(), ".prettierrc");
    if (fs.existsSync(prettierPath)) {
      let content = fs.readFileSync(prettierPath, "utf-8");
      eval(`evalTemp = ${content}`);
    }

    resolve(evalTemp);
  });
}
