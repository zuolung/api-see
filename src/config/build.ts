import Webpack, { Stats } from "webpack";
import getPro from "./webpack.pro.config.js";
// @ts-ignore
import * as ora from "ora";

const spinner = ora.default();

export default async function build() {
  process.env["NODE_ENV"] === "production";
  const Con = await getPro();
  const compile = Webpack(Con as any);
  try {
    // @ts-ignore
    compile.run((err: Error | null, stats: Stats) => {
      if (err) {
        spinner.fail(err.toString());
        process.exit(1);
      }
      spinner.info(stats.toString());
    });
  } catch (err) {
    spinner.fail(err.toString());
    process.exit(1);
  }
}
