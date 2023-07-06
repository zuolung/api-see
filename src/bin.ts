#!/usr/bin/env node
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Command } from "commander";
import watch from "./watch.js";
import build from "./build.js";

const program = new Command();

program
  .command("watch")
  .description(
    "in watch mode, build api-ui from request types and run mock server"
  )
  .option("-p, --path <path>", "request types path")
  .option("-s, --server <server>", "if start api-ui server")
  .option("-m, --mock <mock>", "if start mock server")
  .action(watch);

program
  .command("build")
  .description("in production mode, build api-ui from request types")
  .option("-p, --path <path>", "request types path")
  .action(build);

program.parse(process.argv);
