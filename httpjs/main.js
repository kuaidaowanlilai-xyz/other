const http = require('http')


http.get("http://c.y.qq.com/soso/fcgi-bin/client_search_cp?w=少年", resp => {
  let data = "";
  resp.on("data", function (chunk) {
    data += chunk;
  });
  resp.on("end", () => {
    let jsonData = JSON.parse(data.match(/^callback\((.*)\)$/)[1])
    console.log('数据==>', jsonData);
  });
  resp.on("error", err => {
    console.log(err.message);
  });
});