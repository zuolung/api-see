/* eslint-disable import/no-named-as-default */
import build from "./config/build.js";
import file from "./file.js";
import getConfig from "./config/getConfig.js";

type Iprops = {
  path: string;
};

const apiConfig = getConfig();
const apiUi = apiConfig || {};

export default async function Run(props: Iprops) {
  const { path = "src/actions/types" } = props;

  await file({
    path: path || apiUi["path"],
    watch: false,
  });

  build();
}
