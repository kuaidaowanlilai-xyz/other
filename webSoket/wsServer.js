//引入 websoket server
const WebSocketServer = require("ws").Server
//实例化 socket
let socket = new WebSocketServer({ port: 23003 })
console.log('WebSoket初始化完成，端口号为 23003')

let clientMap = {}

//连接 
/*  socket.clients 获取所有链接的客户端
*/
socket.on("connection", ws => {
    let currentOnlinePopulation = 0
    socket.clients.forEach(_ => {
        currentOnlinePopulation += 1
    });
    ws.send(`系统：当前在线人数 ${currentOnlinePopulation}`)
    console.log(`系统：当前在线人数 ${currentOnlinePopulation}`)

    //获取用户传递的数据
    ws.on("message", data => {
        messageFun(data, ws)
    })

    //错误
    ws.on("error", err => {
        console.log("error:" + err)
    })
})

function messageFun(data, ws) {
    let messageData = JSON.parse(data)
    clientMap[messageData.user] = ws
    if (messageData.msg) {
        if (messageData.chatObject && false) {
            console.log(`${messageData.user}==>${messageData.chatObject}：${messageData.msg}`)
            clientMap[messageData.user].send(`${messageData.user}：${messageData.msg}`)
            clientMap[messageData.chatObject].send(`${messageData.user}：${messageData.msg}`)
        }else{
            console.log(`${messageData.user}：${messageData.msg}`)
            for (let key in clientMap) {
                clientMap[key].send(`${messageData.user}：${messageData.msg}`)
            }
        }
    }
}

