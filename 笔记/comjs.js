/*
 * @Author: 徐浩
 * @Date: 2020-12-16 16:30:20
 * @LastEditTime: 2020-12-18 10:13:42
 * @LastEditors: Please set LastEditors
 * @Description: 将时间戳转换成日期形式
 * @FilePath: kuaidaowanlilai-xyz.github.io\groceryStore\待整理\formatDate.js
 */

const comjs = {}

/**
 * 时间格式的转换
 * @param {Date|Number|String} [nowTime = new Date()] 传入的时间(标准时间对象、时间戳、其他时间格式的字符串)
 * @param {String} [type = 'yyyy-MM-dd HH:mm:ss'] 输出时间的格式('Date' or 'timestamp' or 'yyyy-MM-dd HH:mm:ss')
 */
 comjs.formatDate = (nowTime, type = 'yyyy-MM-dd HH:mm:ss') => {
  if(!nowTime) nowTime = new Date()
  let time = new Date(nowTime)
  let year = time.getFullYear() //取得4位数的年份
  let month = time.getMonth()+1 //取得日期中的月份，其中0表示1月，11表示12月
  let monthB = time.getMonth()+1 < 10 ? '0' + (time.getMonth()+1) : time.getMonth()+1 //取得日期中的月份，其中0表示1月，11表示12月（补0）
  let date = time.getDate() //返回日期月份中的天数（1到31）
  let dateB = time.getDate() < 10 ? '0' + time.getDate() : time.getDate() //返回日期月份中的天数（01到31）
  let hour = time.getHours() //返回日期中的小时数（0到23）
  let hourB = time.getHours() < 10 ? '0' + time.getHours() : time.getHours() //返回日期中的小时数（00到23）
  let minute = time.getMinutes() //返回日期中的分钟数（0到59）
  let minuteB = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes() //返回日期中的分钟数（00到59）
  let second = time.getSeconds() //返回日期中的秒数（0到59）
  let secondB = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds() //返回日期中的秒数（00到59）
  if(type == 'Date'){
    return time
  }else if(type == 'timestamp'){
    return time.getTime()
  }else{
    return type.replace(/y{4}/g, year)
                .replace(/M{2}/g, monthB)
                .replace(/d{2}/g, dateB)
                .replace(/H{2}/g, hourB)
                .replace(/m{2}/g, minuteB)
                .replace(/s{2}/g, secondB)
                .replace(/M/g, month)
                .replace(/d/g, date)
                .replace(/H/g, hour)
                .replace(/m/g, minute)
                .replace(/s/g, second)
  }
}

// blob 转 base64
comjs.blobToBase64 = function(blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      resolve(e.target.result)
    }
    // readAsDataURL
    fileReader.readAsDataURL(blob)
    fileReader.onerror = () => {
      reject(new Error('blobToBase64 error'))
    }
  })
}

// 二进制流 转 blob 再转 url
comjs.blobToUrl = function(data, type) {
  const blob = new Blob([data], { type: type })
  return window.URL.createObjectURL(blob)
}

// base64 转 blob
comjs.base64ToBlob = function({
  b64data = '',
  contentType = '',
  sliceSize = 512
} = {}) {
  return new Promise((resolve, reject) => {
    // 使用 atob() 方法将数据解码
    const byteCharacters = atob(b64data)
    const byteArrays = []
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize)
      const byteNumbers = []
      for (let i = 0; i < slice.length; i++) {
        byteNumbers.push(slice.charCodeAt(i))
      }
      // 8 位无符号整数值的类型化数组。内容将初始化为 0。
      // 如果无法分配请求数目的字节，则将引发异常。
      byteArrays.push(new Uint8Array(byteNumbers))
    }
    let result = new Blob(byteArrays, {
      type: contentType
    })
    result = Object.assign(result, {
      // 这里一定要处理一下 URL.createObjectURL
      preview: URL.createObjectURL(result),
      name: `XXX.png`
    })
    resolve(result)
  })
}

// blob 转 base64
comjs.blobToBase64 = function(blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      resolve(e.target.result)
    }
    // readAsDataURL
    fileReader.readAsDataURL(blob)
    fileReader.onerror = () => {
      reject(new Error('blobToBase64 error'))
    }
  })
}

// 深拷贝（基于递归的）
comjs.deepCopy = (source) => {
  function isObject(obj) {
    return typeof obj === 'object' && obj !== null
  }
  if (!isObject(source)) return source // 如果不是对象的话直接返回
  const target = Array.isArray(source) ? [] : {} // 数组兼容
  for (var k in source) {
    if (source.hasOwnProperty(k)) {
      if (typeof source[ k ] === 'object') {
        target[ k ] = comjs.deepCopy(source[ k ])
      } else {
        target[ k ] = source[ k ]
      }
    }
  }
  return target
}

// 深拷贝（防栈溢出）
comjs.cloneLoop = (x) => {
  const root = {}

  // 栈
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x
    }
  ]

  while (loopList.length) {
    // 深度优先
    const node = loopList.pop()
    const parent = node.parent
    const key = node.key
    const data = node.data

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent
    if (typeof key !== 'undefined') {
      res = parent[key] = {}
    }

    for (const k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === 'object') {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k]
          })
        } else {
          res[k] = data[k]
        }
      }
    }
  }

  return root
}

/**
 * 复制到剪切板
 * @param {String} idStr dom的 id(#mydom) 或 class名(.mydom) 或 dom对象
 */
comjs.copyToClipboard = (idStr) => {
  // console.log('复制到剪切板', idStr)
  let contentDom
  if (typeof idStr === 'string') {
    contentDom = document.querySelector(idStr)
  } else {
    contentDom = idStr
  }
  contentDom.focus()
  if (window.getSelection) {
    if (window.getSelection().baseOffset === window.getSelection().extentOffset) {
      const range = document.createRange()
      range.selectNodeContents(contentDom)
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(range)
    }
  } else if (document.selection) {
    const range = document.body.createTextRange()
    range.moveToElementText(contentDom)
    range.select()
  }
  // 执行复制
  if (document.execCommand('copy')) {
    this.$message({
      type: 'success',
      message: '已复制到剪切板！'
    })
  } else {
    this.$message({
      type: 'error',
      message: '浏览器不支持复制功能，请手动复制'
    })
  }
}

export default comjs