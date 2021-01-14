const Koa = require("koa"); //koa
const Router = require("koa-router"); //koa的路由
const static = require("koa-static"); //静态资源加载
const bodyParser = require("koa-bodyparser"); //解析post请求
const views = require("koa-views"); //koa-页面模板
const session = require("koa-session"); //服务器存储
const multer = require("koa-multer"); //文件上传
// const db = require("./moudle/db") //引入数据库
const cors = require("koa2-cors"); //解决跨域
const fs = require('fs');
const client = require('./AipSpeechClient');
const {
    stringify
} = require("querystring");

//实例化
const app = new Koa();
const router = new Router();

//注入依赖模块
app.use(cors()); //解决跨域
app.use(static(__dirname + "/public")); //静态资源
app.use(bodyParser()); //解析post请求
app.use(views("views", {
    extension: "ejs"
})); //页面模板
app.use(router.routes()).use(router.allowedMethods()); //解析路由

router.get("/getList", ctx => {
    let list = require('./data/list.json');
    ctx.body = {
        success: 1,
        data: {
            list
        },
        error: null
    }
})

router.get("/txtToAudio", async ctx => {
    const txt = ctx.query.txt;
    const name = ctx.query.name;
    let data = null;
    let error = null;
    let success = 0;
    if (typeof (txt) === 'string' && typeof (name) === 'string') {
        let has = await new Promise((res, rej) => {
            fs.access(`./audio/${name}.mp3`, fs.constants.F_OK, async (err) => {
                res(!err)
            });
        })
        console.log(has);

        if (!has) {
            console.log('alive');
            // 语音合成, 附带可选参数
            await client.text2audio(txt, {
                spd: 4,
                per: 4
            }).then(function (result) {
                if (result.data) {
                    fs.writeFileSync(`./audio/${name}.mp3`, result.data);
                    success = 1;
                    data = {
                        url: `http://47.94.142.206/nodeServer/audio/${name}.mp3`
                    };
                } else {
                    // 服务发生错误
                    error = {
                        code: '011',
                        data: '服务发生错误'
                    }
                }
            }, function (e) {
                // 发生网络错误
                error = {
                    code: '001',
                    data: '网络错误'
                }
            });
        } else {
            console.log('alive');
            error = {
                code: '012',
                data: '以存在同名文件',
                url: `http://47.94.142.206/nodeServer/audio/${name}.mp3`
            }
        }
    } else {
        error = {
            code: '002',
            data: '参数格式不正确'
        }
    }
    console.log('body');
    ctx.body = {
        success,
        data,
        error
    }

})

//开启服务
app.listen(23333, _ => {
    console.log("server running at http://localhost:23333");
});