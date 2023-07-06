const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const { swagggerToRepo } = require("./core/swagger-to-repo/index");
const {
  getActiveFileName,
  formatTs,
  formatCurrentFile,
} = require("./core/common");
const { createService } = require("./core/swagger-to-repo/createService");

async function activate(context) {
  console.log('Congratulations, your extension "swagger-repo" is now active!');

  const cursorChangeListener = vscode.window.onDidChangeTextEditorSelection(
    async (event) => {
      const editor = event.textEditor;
      const selection = event.selections[0];

      const wordRange = editor.document.getWordRangeAtPosition(selection.start);
      const word = wordRange ? editor.document.getText(wordRange) : "";
      const currentFile = getActiveFileName();

      if (word) {
        /** swagger单个模块的全部转换 */
        if (/^\#11$/.test(word)) {
          const res = await swagggerToRepo(
            "all"
          );
          const { resultTS, baseType, swaggerKey } = res || {}
          if (resultTS) {
            editor.edit((editBuilder) => {
              editBuilder.replace(wordRange, formatTs(resultTS));
              formatCurrentFile((fileName) => {
                createService(fileName)
              });
            });
            const baseTypePath = path.resolve(
              currentFile,
              `../BASE-${swaggerKey}.ts`
            );
            fs.writeFileSync(baseTypePath, formatTs(baseType));
          }
        }

        /** swagger单个接口的转换 */
        if (/^\#22$/.test(word)) {
          const res = await swagggerToRepo(
            "item",
          );
          const { resultTS, baseType, swaggerKey } = res || {}

          if (resultTS) {
            editor.edit((editBuilder) => {
              editBuilder.replace(wordRange, formatTs(resultTS));
              formatCurrentFile((fileName) => {
                createService(fileName)
              });
            });
            const baseTypePath = path.resolve(
              currentFile,
              `../BASE-${swaggerKey}.ts`
            );
            fs.writeFileSync(baseTypePath, formatTs(baseType));
          }
        }

         /** 单独生成和ts类型对应的请求 */
         if (/^\#33$/.test(word)) {
          const currentFielNameArr = currentFile.split('/')
          const currentFielName = currentFielNameArr[currentFielNameArr.length - 1]
          const mapTsPath = path.resolve(currentFile, `../typings/${currentFielName}`)

          if (fs.existsSync(mapTsPath)) {
            const ProgressLocation = vscode.ProgressLocation;

            await vscode.window.withProgress({
              location: ProgressLocation.Notification,
              title: 'service生成中...',
              cancellable: false,
            }, async () => {
              const res = createService(mapTsPath, true)
              editor.edit((editBuilder) => {
                editBuilder.replace(wordRange, res);
              });
            });
          }
        }
      }
    }
  );

  context.subscriptions.push(cursorChangeListener);
}

module.exports = {
  activate,
};
