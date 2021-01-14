const http = require('http')
const querystring = require('querystring');

//初始化百度的Api
const AipSpeechClient = require("baidu-aip-sdk").speech;
// 设置APPID/AK/SK
const APP_ID = "17070693";
const API_KEY = "idapyGnpnOSFr8o4CE6tu0N1";
const SECRET_KEY = "xrtS6YG35mNwwGglIk2aSr53Rz7wMGwB";
// 新建一个对象，建议只保存一个对象调用服务接口
const client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);



let server = http.createServer()
server.on('request', function (request, response) {
  request.url != '/favicon.ico' ? console.log('收到客户端的请求了，请求路径是：' + request.url) : ''
  if (request.url == '/speechSynthesis') {
    //定义了一个post变量，用于暂存请求体的信息
    let post = ''
    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    request.on('data', function (chunk) {
      post += chunk;
    });
    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    request.on('end', function () {
      let responseData
      try {
        post = querystring.parse(post);
        response.setHeader('Content-Type', 'text/plain; charset=utf-8')
        responseData = JSON.parse(Object.keys(post)[0])
        console.log('准备合成====>>', responseData.textarea)
      } catch (error) {
        console.log('参数错误')
        response.end('参数错误')
        return
      }
      response.setHeader('Content-Type', 'audio/mpeg')
      client.text2audio(responseData.textarea, {
        spd: 5, //语速，取值0-9，默认为5中语速
        per: 4, //发音人选择, 0为女声，1为男声，3为情感合成-度逍遥，4为情感合成-度丫丫，默认为普通女
      }).then(function (result) {
        if (result.data) {
          response.end('data:audio/mpeg;base64,' + new Buffer.from(result.data, 'utf-8').toString('base64'))
        } else {
          console.log('语音合成服务发生错误', result)
          response.end(result)
        }
      }, function (e) {
        console.log('语音合成发生网络错误', e)
        response.end(e)
      });
    });
  } else {
    response.setHeader('Content-Type', 'text/plain; charset=utf-8')
    response.end('首页')
  }
}).on('error', function (err) {
  console.log('服务器错误', err);
}).listen(23001, function () {
  console.log('服务器启动成功，可以通过 http://localhost:23001/ 来进行访问')
})