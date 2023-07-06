const vscode = require("vscode");
const { fetchData } = require('../fetch')
const { transformSwagger, reset } = require('./transform')
const { getFirstJsDocComment, parseComments, getSwaggerConfig } = require('../common')

async function swagggerToRepo(type) {
  reset()
  const config = getSwaggerConfig()
  const swaggers = config.swaggers
  const fileComments = getFirstJsDocComment()
  if (fileComments && swaggers) {
    const commentsObj = parseComments(fileComments)

    if (commentsObj.swagger && swaggers[commentsObj.swagger]) {
      const swaggerTarget = swaggers[commentsObj.swagger]
      const swaggerData = await fetchData(swaggerTarget)
      if (!swaggerData) return false
      if (type === 'all') {
        const menus = swaggerData.tags.map(item => {
          return {
            ...item,
            label: item.name
          }
        });
        const option = await vscode.window.showQuickPick(menus, { 
          canPickMany: false,
          placeHolder: '请选择swagger模块生成代码'
         })
        // @ts-ignore
        if (option && option.label) {
          // @ts-ignore
          const resultTs = await transformSwagger(swaggerData, option.label, '', commentsObj.swagger)

          return {
            ...resultTs,
            swaggerKey: commentsObj.swagger
          }
        }
      } else if (type === 'item') {
        const menus = []
        const allPaths = swaggerData.paths

        for (const key in allPaths) {
          menus.push({
            label: key,
            description: allPaths[key].summary
          })
        }
        const option = await vscode.window.showQuickPick(menus, { 
          canPickMany: false,
          placeHolder: '请选择swagger下的接口路径生成代码'
         })

        if (option && option.label) {
          const resultTs = await transformSwagger(swaggerData, '', option.label, commentsObj.swagger)

          return {
            ...resultTs,
            swaggerKey: commentsObj.swagger
          }
        }
      }
    } else {
      vscode.window.showErrorMessage('swagger-repo: 请在页面头部设置jsDoc设置swagger（swagger.config.js对应的swaggers的key）')
    }
  } else {
    vscode.window.showErrorMessage('swagger-repo:  请在页面头部设置jsDoc设置swagger（swagger.config.js对应的swaggers的key）')
  }
}


module.exports = {
  swagggerToRepo
}