const { pinyin } = require('pinyin-pro')
const { versionCompatible } = require('./versionCompatible')

const typeNameCache = []

async function transformSwagger(
  data,
  moduleTarget,
  pathTarget,
  swaggerKey
) {
  let resultTS = ''
  const allDependencies = []
  const { definitions } = versionCompatible({
    data: data,
  })
  const paths = data['paths']

  for (const key in paths) {
    if (key === pathTarget || !pathTarget) {
      const method = Object.keys(paths[key])[0]
      const item = paths[key][method]
      const moduleName = moduleTarget
        ? item.tags.find((it) => moduleTarget === it)
        : ''
  
      if (moduleName || !moduleTarget) {
        let reqCodes = ''
  
        const parameters = versionCompatible({
          requestParams: item,
          data: data,
        }).pathsRequestParams
  
        for (const km in parameters) {
          const it = parameters[km]
          const { codes, dependencies } = parseDef(it, it.name)
          reqCodes += `${codes}`
  
          dependencies.map((dep) => {
            if (!allDependencies.includes(dep)) {
              allDependencies.push(dep)
            }
          })
        }
  
        if (reqCodes.includes(':')) {
          reqCodes = `{
            ${reqCodes}
          }`
        }
  
        if (!reqCodes) reqCodes = 'undefined \n'
  
        let resCodes = ``
        const responseItem = versionCompatible({
          responseData: item,
          data: data,
        }).pathsResponseData
  
        if (
          responseItem &&
          responseItem.schema 
        ) {
          const schema = responseItem.schema 
          const resParseResult = parseDef(schema)
          resCodes += resParseResult.codes
  
          resParseResult.dependencies.map((dep) => {
            if (!allDependencies.includes(dep)) {
              allDependencies.push(dep)
            }
          })
        } else {
          resCodes = "undefined"
        }
  
        const typeName = getRequestTypeName(key)

        resultTS += `
      /**
       * ${item.summary || '--'}
       * @url ${key}
       * @method ${method}
       * @introduce ${item.description || '--'}
       */
      export type I${typeName} = {
        request: ${reqCodes}
        response: ${resCodes}
      }
      `
      }
    }
  }

  const baseImport = `import type { ${allDependencies.join(
    ',',
  )} } from './BASE-${swaggerKey}'
    `

  if (allDependencies.length) resultTS = `${baseImport}${resultTS}`

  let baseType = ''

  for (const key in definitions) {
    const def = definitions[key]

    const parseResult = parseDef(def)
    const commentsParams = {}
    if (def.description) commentsParams['description'] = def.description
    const baseKey = formatBaseTypeKey(key)

    const comments = createComments(commentsParams)
    baseType += `${comments}export type ${baseKey} = ${parseResult.codes}`
  }

  return {
    resultTS,
    baseType,
    swaggerData: data
  }
}

function parseDef(def, kk) {
  const dependencies = []
  const requiredArr = def.required && Array.isArray(def.required) ? def.required : []
  const result = workUnit(def, kk, undefined, requiredArr)

  function workUnit(data, key, noMark, requiredArr = []) {
    if (key && key.includes('.')) return ''
    const noRequired = ifNotRequired(key, data.required, requiredArr) ? '?' : ''
    let res = ''
    if (data.type && isBaseType(data.type)) {
      const type__ = resetTypeName(data.type)
      const $description = data.description
      if (key) {
        const commentsParams = {}
        if ($description) commentsParams['description'] = $description

        const comments = createComments(commentsParams)

        return `${comments}${key}${noRequired}:${type__}${noMark ? '' : ' \n'}`
      } else return type__
    } else if (data.type === 'object' || data.schema?.type === 'object') {
      const properties = data.properties || data.schema?.properties
      const curRequiredArr = data.required && Array.isArray(data.required) ? data.required : []

      if (!properties) {
        if (!data.additionalProperties || JSON.stringify(data.additionalProperties) === '{}') {
          if (key) {
            res = `${key}${noRequired}:{}${noMark ? '' : '\n'}`
          } else {
            res = `{}${noMark ? '' : '\n'}`
          }
        } else {
          const nextWork = workUnit(data.additionalProperties, undefined, undefined, curRequiredArr)
          if (key) {
            res = `${key}${noRequired}:Record<string, ${nextWork || 'null'}>${noMark ? '' : '\n'}`
          } else {
            res = `Record<string, ${nextWork}>${noMark ? '' : '\n'}`
          }
        }
      } else {
        if (!key) res += `{ \n `

        for (const kk in properties) {
          const item = properties[kk]
          res += workUnit(item, kk, undefined, curRequiredArr)
        }

        if (!key) res += `} ${noMark ? '' : '\n'}`
      }
    } else if (data.type === 'array' || data.schema?.type === 'array') {
      const type__ = data.type || data.schema?.type
      const items__ = data.items || data.schema?.items
      if (Object.keys(items__).length === 0) {
        res += `${key}${noRequired}:any[] ${noMark ? '' : '\n'}  `
      } else {
        if (type__ && isBaseType(type__)) {
          res += workUnit(
            {
              ...items__,
              required: data.required,
              description: data.description,
            },
            key,
            true,
          )
        } else if (items__ && !isBaseType(type__)) {
          if (items__.properties) res += `{ \n `
          res += workUnit(
            {
              ...items__,
              required: data.required,
              description: data.description,
              rule: 2,
            },
            key,
            true,
          )
          if (items__.properties) res += `} ${noMark ? '' : '\n'}`
        } else if (data.items?.$ref) {
          const $ref = formatBaseTypeKey(data.items?.$ref)
          dependencies.push($ref)
          res += workUnit({ type: $ref }, key, true)
        }
        res += `[] ${noMark ? '' : '\n'} `
      }
    } else if (data.$ref) {
      const commentsParams = {}
      if (data.description) commentsParams['description'] = data.description

      const comments = createComments(commentsParams)

       let $ref = formatBaseTypeKey(data.$ref)

       if ($ref === 'List') {
        $ref = 'any[]'
       }
      dependencies.push($ref)
      return `${
        key ? `${comments}${key}${noRequired}:` : ''
      }${$ref}${noMark ? '' : ' \n '}`
    } else if (data.schema) {
      return workUnit(data.schema, key, true)
    } 
    return res
  } 

  return {
    codes: result,
    dependencies: dependencies,
  }
}

function ifNotRequired(key, required, requireArr) {
  if (required === false) return true
  if (requireArr && requireArr.length && !requireArr.includes(key)) return true

  return false
}

function isBaseType(d) {
  return !['object', 'array'].includes(d || '')
}

function resetTypeName(type) {
  if (type === 'file') return 'any'
  if (type === 'integer') return 'number'
  if (type === 'ref') return 'string'
  return type
}

function getRequestTypeName(url) {
  const arrUrl = url.split('/').map((item) => {
    // 防止使用 a/${xxId}/abc
    return item.replace('{', '').replace('}', '')
  })

  if (arrUrl.length > 1) {
    let u = `${arrUrl[arrUrl.length - 2]}${wordFirstBig(
      arrUrl[arrUrl.length - 1] || '',
    )}`

    u = typeNameCache.includes(u) ? u + `1` : u
    u = u.replace(/\-/g, '').replace(/\./g, '')

    typeNameCache.push(u)

    return u
  } else {
    return arrUrl[arrUrl.length - 1]
  }
}

function wordFirstBig(str) {
  return str.substring(0, 1).toLocaleUpperCase() + str.substring(1)
}

/** 解决类型名称太长 */
let typeMap = {}
let typeCache  = []

function reset() {
  typeMap={}
  typeCache = []
}

function formatBaseTypeKey(key) {
  let res = key
  res = res
    .replace('#/components/schemas/', '')
    .replace('#/definitions/', '')
    .replace('`', '')
  const origin = res

  /** 服务端范型类转换成统一的名称，后续作重复处理 */
  if (res.includes('«')) {
    res = res.split('«')[0] || ''
  }

  if (res.includes('[[')) {
    res = res.split('[[')[0] || ''
  }

  if (res.includes('<')) {
    res = res.split('<<')[0] || ''
  }

  if (res.includes('（')) {
    res = res.split('（')[0] || ''
  }

  if (res.includes('(')) {
    res = res.split('(')[0] || ''
  }

  /** 引用过长的时候只取后续两位 */
  if (res.includes('.')) {
    const arr = res.split('.')
    const arrLen = arr.length
    if (arr && arrLen >= 2 && arr[arrLen - 1] && arr[arrLen - 2]) {
      // @ts-ignore
      res = arr[arrLen - 1] + wordFirstBig(arr[arrLen - 2])
    }
  }
  res = res.replace(/\s/g, '')
  res = pinyin(res, { toneType: 'none' })
  res = res.replace(/\s/g, '')

  if (typeMap[origin]) return typeMap[origin]

  while (typeCache.includes(res)) {
    res = resetRepeatName(res)
  }
  typeCache.push(res)
  typeMap[origin] = res

  return res
}

function createComments(params) {
  let res = ''
  if (params && Object.keys(params).length > 0) {
    res += `/**
    `
    for (const key in params) {
      // 移除影响jsDoc的描述信息如`*/`
      res += ` * @${key} ${`${params[key] || ''}`.replace(/\/\*/g, '').replace(/\*\//g, '')}
      `
    }
    res += `*/
    `
  }

  return res
}

function resetRepeatName(name) {
  if (/[0-9]{1,4}$/g.test(name)) {
    const words = name.replace(/[0-9]{1,4}$/g, '')
    let num = name.match(/[0-9]{1,4}$/g)[0] || 0

    num = Number(num) + 1
    return `${words}${num}`
  } else {
    return `${name}0`
  }
}


module.exports = {
  transformSwagger,
  reset
}