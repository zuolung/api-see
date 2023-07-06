function versionCompatible(dna) {
  const { data, requestParams, responseData } = dna
  const swaggerVersion = data['swagger'] || data['openapi']
  let definitions = []
  let pathsRequestParams = undefined
  let pathsResponseData = undefined

  if (/^3\./.test(swaggerVersion)) {
    definitions = data['components']['schemas']
    if (requestParams) {
      pathsRequestParams =
        requestParams['requestBody']?.['content']?.['application/json'] ||
        requestParams['requestBody']?.['content']?.['text/json'] || filterRepeatName(requestParams['parameters'])
    }
    if (responseData) {
      pathsResponseData =
        responseData?.['responses']?.['200']?.['content']?.[
          'application/json'
        ] || responseData?.['responses']?.['200']?.['content']?.['text/json']
    }
  } else if (/^2\./.test(swaggerVersion)) {
    definitions = data['definitions']
    if (requestParams) {
      pathsRequestParams = filterRepeatName(requestParams['parameters'])
    }

    if (responseData) {
      pathsResponseData = responseData?.['responses']?.['200']
    }
  }

  return {
    definitions,
    pathsRequestParams,
    pathsResponseData,
  }
}
// 低版本有可能有重复申明的请求字段类型
function filterRepeatName(arr) {
  const keys = []
  const newArr = []

  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      if (!keys.includes(arr[i].name)) {
        newArr.push(arr[i])
        keys.push(arr[i].name)
      }
    }
  }

  return newArr
}

module.exports = {
  versionCompatible
}