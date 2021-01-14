const fs = require('fs');
const http = require('http')

//初始化百度的Api
const AipSpeechClient = require("baidu-aip-sdk").speech;
// 设置APPID/AK/SK
const APP_ID = "17070693";
const API_KEY = "idapyGnpnOSFr8o4CE6tu0N1";
const SECRET_KEY = "xrtS6YG35mNwwGglIk2aSr53Rz7wMGwB";
// 新建一个对象，建议只保存一个对象调用服务接口
const client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);
console.log('百度的Api初始化成功')


//读取本地文件
let content
try {
    content = fs.readFileSync('./src/fiction/三体.txt', 'utf-8')
    // console.log('读取本地文件', content)
} catch (error) {
    console.log('文件读取失败', error)
}

let contentArrOr = content.split('\n')
// console.log('文件每一行', contentArrOr)
let contentArr = []
for (let i = 0; i < contentArrOr.length; i++) {
    if (!/^\s*$/.test(contentArrOr[i])) {
        contentArr.push(contentArrOr[i].replace('\r', ''))
    }
}
// console.log('处理空白符', contentArr)
console.log('文本处理完毕')


//语音合成
clientFun(contentArr[0], 0)
function clientFun(contentLint, index){
    console.log(`语音合成中...${index}`)
    client.text2audio(contentLint,
        {
            spd: 5, //语速，取值0-9，默认为5中语速
            per: 0, //发音人选择, 0为女声，1为男声，3为情感合成-度逍遥，4为情感合成-度丫丫，默认为普通女
        }
    ).then(function (result) {
        if (result.data) {
            fs.writeFileSync(`./src/mp3/cache${index}.mp3`, result.data);
            console.log(`合成成功——${index}，可到 ./src/mp3 目录内查看`)
        } else {
            // 服务发生错误
            console.log('语音合成服务发生错误', result)
        }
    }, function (e) {
        // 发生网络错误
        console.log('语音合成发生网络错误', e)
    });
}