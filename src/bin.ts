#!/usr/bin/env node
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Command } from "commander";
import watch from "./watch.js";
import build from "./build.js";
import file from "./file.js";
import swagger from "./swagger/index.js";

const program = new Command();

program
  .command("watch")
  .description(
    "监听请求类型文件，生成文档服务、mock服务、请求方法"
  )
  .option("-p, --path <path>", "请求类型TS文件的")
  .option("-s, --server <server>", "是否启动文档服务")
  .option("-m, --mock <mock>", "是否启动mock服务")
  .option("-a, --action <action>", "是否生成请求方法")
  .action(watch);

program
  .command("build")
  .description("打包在线文档")
  .option("-p, --path <path>", "请求类型文件所在路径")
  .action(build);

program
  .command("file")
  .description("寻找所有的ts请求文件，生成请求方法")
  .option("-p, --path <path>", "请求类型文件所在路径")
  .option("-w, --watch <watch>", "是否监听文件变化")
  .option("-a, --action <action>", "是否生成请求方法")
  .action(file);

program
  .command("swagger")
  .description("根据swagger去生成请求类型和请求方法、聚合swagger服务并提供搜索功能")
  .option("-p, --dir <dir>", "所有ts类型和请求方法所在的最外层文件夹")
  .option("-ser, --service-name <serviceName>", "选择需要转换的swagger服务名称")
  .option("-d, --docs <docs>", "聚合多个swagger服务，并添加搜索功能")
  .action(swagger);

program.parse(process.argv);
