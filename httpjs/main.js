const http = require('http')
var fs = require('fs')


// http.get("http://c.y.qq.com/soso/fcgi-bin/client_search_cp?w=少年", resp => {
//   let data = "";
//   resp.on("data", function (chunk) {
//     data += chunk;
//   });
//   resp.on("end", () => {
//     let jsonData = JSON.parse(data.match(/^callback\((.*)\)$/)[1])
//     console.log('数据==>', jsonData);
//   });
//   resp.on("error", err => {
//     console.log(err.message);
//   });
// });


// http.get("http://u.y.qq.com/cgi-bin/musicu.fcg", resp => {
//   let data = "";
//   resp.on("data", function (chunk) {
//     data += chunk;
//   });
//   resp.on("end", () => {
//     let jsonData = JSON.parse(data.match(/^callback\((.*)\)$/)[1])
//     console.log('数据==>', jsonData);
//   });
//   resp.on("error", err => {
//     console.log(err.message);
//   });
// });


http.get('http://u.y.qq.com/cgi-bin/musicu.fcg', function (resp) {
  resp
    .on("end", () => {
      console.log('请求 结束')
    })
    .pipe(fs.createWriteStream('baidu.json'))
    .on("error", (e) => {
      console.log("pipe 错误", e)
    })
    .on("finish", () => {
      console.log("pipe 完成")
    })
    .on("close", () => {
      console.log("pipe 关闭")
    })
})


// let Ut = require("./common");
//
// (async () => {
//   try {
//     let url = "http://ws.stream.qqmusic.qq.com/amobile.music.tc.qq.com/C400000S7TGL43hhBO.m4a?guid=514653892&vkey=EAB8637D8F6334907A44611F29DA8F629028A1A4928AB9537A4E1AC3D702A500FAA36E335404C19F33F9EF21E5CD780E0D13B540364F8C0B&uin=0&fromtag=66";
//     let opts = {
//       url: url,
//     };
//     let path = "1.m4a";
//     let r1 = await Ut.downImg(opts, path);
//     console.log(r1, '777777777');
//   }
//   catch (e) {
//     console.log(e);
//   }
// })()







