const http = require('http')


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


// http.get("https://u.y.qq.com/cgi-bin/musicu.fcg", resp => {
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


let aa = '/music/musicDownload/C400000S7TGL43hhBO.m4a'
console.log(aa.split('/'))









