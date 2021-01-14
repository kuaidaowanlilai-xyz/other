const mysql = require("mysql")

const http = require('http')
const https = require('https')
const querystring = require('querystring')
const fs = require("fs")

//数据库连接操作
function mysqlData(parameter, sql) {
  let defaultParameter = {
    host: "123.56.54.241",
    user: "root",
    password: "XH642508@qq.com",
    database: "nodejs"
  }
  Object.keys(defaultParameter).forEach(key => {
    if (parameter[key]) {
      defaultParameter[key] = parameter[key]
    }
  })
  return new Promise(function (resolve, reject) {
    let connection = mysql.createConnection(defaultParameter)
    connection.connect()
    connection.query(sql, [], function (err, result) {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
    connection.end()
  })
}


http.createServer().on('request', app).on('error', function (err) {
  console.log('服务器错误', err)
}).listen(23000, function () {
  console.log('服务器启动成功，可以通过 http://localhost:23000/ 来进行访问')
})

// https.createServer({
//   key: fs.readFileSync("./2_www.kuaidaowanlilai.xyz.key"),
//   cert: fs.readFileSync("./1_www.kuaidaowanlilai.xyz_bundle.crt")
// }, app).listen(443);


//请求处理
function app(req, res) {
  req.url != '/favicon.ico' ? console.log('收到客户端的请求了，请求路径是：' + req.url) : ''
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Request-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type,test-token,test-sessid')
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')

  if (req.method === 'POST') {
    //定义了一个post变量，用于暂存请求体的信息
    let post = ''
    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function (chunk) {
      post += chunk
    })
    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function () {
      let resData
      try {
        resData = JSON.parse(Object.keys(querystring.parse(post))[0])
        console.log('参数====>>', resData)
      } catch (err) {
        res.end('参数解析错误' + err)
        return
      }

      //获取评论
      if (req.url == '/comments') {
        try {
          let sql = `select * from comments_0 where blog_url="${resData.blogUrl}";`
          mysqlData({}, sql).then(sqlRes => {
            res.end(JSON.stringify(sqlRes))
          })
        } catch (err) {
          console.log('数据库查询错误', err)
          res.end('数据库查询错误' + err)
        }
      } else
        //写入评论
        if (req.url == '/published') {
          try {
            let sql = `insert into comments_0 values(null, 
            '${resData.username ? resData.username : '游客'}', 
            '${resData.blogUrl}', 
            '${resData.content}');`
            mysqlData({}, sql).then(sqlRes => {
              // console.log('写入评论写入评论', res)
              res.end(JSON.stringify(sqlRes))
            })
          } catch (err) {
            // console.log('数据库写入错误', err)
            res.end('数据库写入错误')
          }
        }
        else {
          res.end(`此POST请求地址无效：${req.url}`)
        }
    })
  } else {
    res.end('非POST请求')
  }
}
