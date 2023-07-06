const vscode = require("vscode");
const fs = require("fs");
const { format } = require("prettier");
const TJS = require("typescript-json-schema");
const path = require("path");

function getFirstJsDocComment() {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    const lineCount = document.lineCount;

    let jsDocComment = "";
    let isInsideJsDoc = false;

    for (let lineNumber = 0; lineNumber < lineCount; lineNumber++) {
      const line = document.lineAt(lineNumber);
      const text = line.text.trim();

      if (isInsideJsDoc) {
        if (text.endsWith("*/")) {
          // 找到最后一个注释行
          jsDocComment += text;
          break;
        } else {
          // 在注释块内部，将当前行添加到注释中
          jsDocComment += text + "\n";
        }
      } else if (text.startsWith("/**")) {
        // 找到第一个 JSDoc 注释
        jsDocComment += text + "\n";
        isInsideJsDoc = true;
      }
    }

    if (jsDocComment) {
      return jsDocComment;
    }
  }

  // 没有找到 JSDoc 注释
  return "";
}

/** 支持普通注释和jscDoc */
function parseComments(comments = "") {
  let res = {};
  const arr = comments
    .split("\n")
    .filter((item) => item.includes("@"))
    .map((item) => item.replace(/^[\s]+/g, ""))
    .map((item) => item.replace("* ", ""))
    .map((item) => item.replace("@", ""))
    .map((item) => item.replace(/[\s]+/, "^^^"));

  arr.forEach((item) => {
    const cons = item.split("^^^");
    res[cons[0]] = cons[1];
  });

  if (Object.keys(res).length === 0 && comments.length > 0) {
    return {
      description: comments,
    };
  }

  return res;
}

function getActiveFileName() {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    return document.fileName;
  }

  return "";
}

function formatTs(str) {
  let res = format(str, {
    parser: "typescript",
    singleQuote: true,
    trailingComma: 'all',
    semi: false,
    arrowParens: 'always'
  });
  // 解决空对象问题
  res = res.replace(/\{\}/g, "Record<string, any>");

  return res;
}

function formatCurrentFile(next, uu) {
  setTimeout(() => {
    const editor = vscode.window.activeTextEditor;

    const uri = uu || editor.document.uri;

    vscode.commands.executeCommand("editor.action.formatDocument", uri).then(() => {
      if (next) {
        setTimeout(async () => {
          await vscode.commands.executeCommand('workbench.action.files.save', uri)

          next(getActiveFileName(), getCurrentFileContent())
        }, 600)
      }
    });
  }, 600);
}

function getCurrentFileContent() {
  // 获取当前活动的编辑器
  const editor = vscode.window.activeTextEditor;
  if (editor && !editor.document.isUntitled && editor.document.isDirty) {
    // 获取当前文件的内容
    const text = editor.document.getText();
    return text;
  }
  return '';
}

function tsTypeParse(file) {
  const program = TJS.getProgramFromFiles(
    [file],
    {
      strictNullChecks: true,
    },
    './',
  )
  return TJS.generateSchema(program, '*', {
    required: true,
    validationKeywords: [
      'value',
      'rule',
      'url',
      'method',
      'introduce',
      'timeout',
    ],
    excludePrivate: true,
    ignoreErrors: true,
  })
}

function getSwaggerConfig () {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if(workspaceFolders.length) {
    const root = workspaceFolders[0]
    const configPath = path.join(root.uri.fsPath, './api.config.js')
    if (fs.existsSync(configPath)) {
      delete require.cache[configPath]
      const config = require(configPath)
      console.info(config)

      return config
    } else return null
  }
}


module.exports = {
  parseComments,
  getFirstJsDocComment,
  getActiveFileName,
  formatCurrentFile,
  formatTs,
  tsTypeParse,
  getSwaggerConfig,
};
