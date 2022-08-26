import path from "path";
// eslint-disable-next-line import/no-named-as-default
import webpack from "webpack";
import Server from "webpack-dev-server";
import getBase from "./webpack.base.config.js";
import getConfig from "./getConfig.js";

const apiConfig = getConfig();
const { buildPort } = apiConfig || {};
const { port } = apiConfig?.mock || {};

const devServer = {
  port: buildPort || 7878,
  hot: true,
  open: true,
  static: {
    directory: path.join(__dirname, "./dist"),
  },
  proxy: {
    "/mock": {
      target: `http://localhost:${port}`,
      changeOrigin: true,
      pathRewrite: {
        "^/mock": "/",
      },
    },
  },
};

export default async function run() {
  process.env["NODE_ENV"] === "development";
  const baseConfig = await getBase();
  const devConfig = Object.assign(baseConfig, {
    mode: "development",
    // devtool: "eval",
    devServer,
  });
  try {
    const compiler = webpack(devConfig as any);
    const app = new Server(devServer, compiler);

    await app.start();
  } catch (err) {
    console.info(err);
    process.exit(1);
  }
}
