function Saolei(id, line = 10, column = 10, num = 10) {

  let saoleiDIv = document.querySelector(id) //传入的dom
  let saoleiArrObj = [] //渲染页面所需要的数据

  //旗子base64
  let flags = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAFJUlEQVRoQ+2ZbWhbVRjH/8/J28QXFMSJtkmltLnJNoZuoAwcCr6MCTKZfhF8wcnwBT/YLwNF7DqmW+bq5phz0gk6qbI61w4Gc4qdOgYT5wfbNUkr2nsTNycMZRtbc29yHjlJ3yxJc3OTtAl44X465/yf/++et+fcQ6jgE2v09LOgXSHd/LKCsrakyFYtm5UUCIjuA6hLMu8MJ8xBm03LrlYlkKyvPwC895lhvrMRkGU7LSJQTZBcaObjAO3QEmZfNWGqDzLpnrqkRCScTI1UA2gOQXLDjZk6Q4lUZ6Vh5hpk3D/3Q4qIlkwdrRTQPIHk7BPzbivtiiw+N2aUCzSvIFkYIMGgTs1I7SgHZt5BpszTCWLeHkyYvU6Aaghk0v6nLmBLi2GeKQWoFkGU/6tgbL98i9mx/DQsO0C1CpJbDIBoBrwlbFifFIOpaZBJ84yjgrm9NWmdKgRUHyBTRDt9wmq/YxT/zASqM5Bs8vYXGO1awtozHabuQAho7zbMTTMz6noC6ZGMjkJnnJoHIeBMGuhYZJgHZlu5ahpEDaML0oysSOJqvS6/PQzeGjKs08UAJsprqkfUMMqAt4YNa79dgJoDIeDtK8KM3Jlnj7ADVQs90sckIyE9fdKO4Vrc2eMgjmi69VE5APM9tCIur7m55VdcrATEeIJZKSlg6gddQc3DYN6kJayfKhc1pzRXcyQuCB2tutldaYA5G1oMdIQM881qAVQdhAifu11iQ/Nv5f8hsfMRqjK0GNgYMsx2OwYqVed/kHxfcmLVqpseiTX5VhGjWUI2E9PtgHr5NgDq9QG4AGCYgREw4gQahKABTR/7vVJDyfFRd7jRvVISrQVoHYBr8xg6C+bh3EUPfgTQCuDG/x5H6YQk9HEGfZX+K190jkT93nYCHgGwfJqpHiL6DkwxSIoFk1fVpc7khjgxtBhwxRq8YRIIMRAmxhoQlhKQkYw+QdwbdJDp5uvVgiAjfm84A2wDsDq7cxIOgbmXr7EOaXFccjpH4gHfajDWMPAYwDcDtFczUi+UO+TygigICRxgYBGAkyDxhqaPfVssWCmTfaDR1+wGbyNSQDi2gNzPNulXzhWLUVL2G/N7VS60jAlvhXTzdbvipYBMaEYbva8RYTMRTgV18x67sYpO9qjfs55Ae5n43ZButZUi7ARE6UcDnk5iehUSS7Wk+UspMQumKLFG7z4QnpPEy8K69XMpok5BhgKeuwSTOp9v0AwzUkrMWUA8/apQS1j3lyroFGRyxXMYN7sYzTQbC/jeB/OLxHJlMJH+oRSYaINb7SHZJ5RMH7fbNt7ovpdJfA+iPZqeesluu+n18oB41oGpC8BBzTAfdyJaapuY3/sFgLUgfl7TrX2lts/bI9lu9nvVbevDAH0QNFKvEJB2Il6sDQPuuN+3C2C1j3ylGeaqYm0KlefdR6JNC5qEzHzIoAfVPiIkt812N+Ek+HCD524pSN23ryDw11K41odGx0adaBXsEVUwGIbXdcnTSUQvA7jMzB8TxDEtkTrsNFhuUvseZciHiOgZANcx8+7M9Vbb4iGY5egWzbXifs/TEniKQA+MBzrLoCOQme60S5y/gc0/Awb+zmdC9+Omi+S91Z2RCyFcTxJY5WwqQwaDvxHA/qCNazU7gEVBJkTG05YnWE1KYMkMcfU1z4+/qmjh+OudUW+AgIMC6GkxzCE7Bu3WsQ0yXVBBWYwlQpCfpQwQkR+EABiBbD2CDobOzAYJoUvJhocwUGnz0z39C3J8PFEMFrq5AAAAAElFTkSuQmCC`

  /* 创建10×10的数组对象
    {
      X: 0, //坐标X
      Y: 0, //坐标Y
      content: 0, //内容
      state: 'OFF', //区块状态: 'OFF'关闭, 'ON'打开, 'ON2'打开(靠内部), 'Q'已插旗
      dom: undefined, //对应的dom节点
    }
  */
  for (let Y = 0; Y < line; Y++) {
    for (let X = 0; X < column; X++) {
      saoleiArrObj.push({
        X: X,
        Y: Y,
        state: 'OFF',
        content: 0,
        dom: undefined,
      })
    }
  }

  //随机给数组赋值 num 个9 (9即是雷)
  for (let i = 0; i < num; i++) {
    let suiji = Math.floor(Math.random() * (line * column))
    while (true) {
      if (saoleiArrObj[suiji].content == 9) {
        suiji = Math.floor(Math.random() * (line * column))
      } else {
        break
      }
    }
    saoleiArrObj[suiji].content = 9
  }

  //把9周围加一
  for (let i = 0; i < saoleiArrObj.length; i++) {
    if (saoleiArrObj[i].content >= 9) { //可能被加一后大于9
      let X = saoleiArrObj[i].X
      let Y = saoleiArrObj[i].Y
      /*
        i 的周围
        X-1,Y-1
        X,Y-1
        X+1,Y-1
        X-1,Y
        x+1,Y
        X-1,Y+1
        X,Y+1
        X+1,Y+1
      */
      for (let j = 0; j < saoleiArrObj.length; j++) {
        let coordinates = `${saoleiArrObj[j].X},${saoleiArrObj[j].Y}`
        if (
          coordinates == `${X - 1},${Y - 1}` ||
          coordinates == `${X},${Y - 1}` ||
          coordinates == `${X + 1},${Y - 1}` ||
          coordinates == `${X - 1},${Y}` ||
          coordinates == `${X + 1},${Y}` ||
          coordinates == `${X - 1},${Y + 1}` ||
          coordinates == `${X},${Y + 1}` ||
          coordinates == `${X + 1},${Y + 1}`
        ) {
          saoleiArrObj[j].content += 1
        }
      }
    }
  }

  //处理 0 和 9
  for (let i = 0; i < saoleiArrObj.length; i++) {
    if (saoleiArrObj[i].content >= 9) {
      saoleiArrObj[i].content = '雷'
    }
    else if (saoleiArrObj[i].content == 0) {
      saoleiArrObj[i].content = ''
    }
  }

  //渲染区块与写入dom数据
  let pageDom = document.createDocumentFragment()
  for (let i = 0; i < saoleiArrObj.length; i++) {
    let fanggeDom = document.createElement('p')
    let domStyle = {
      margin: `1px`,
      width: `${saoleiDIv.clientWidth / column - 2}px`,
      height: `${saoleiDIv.clientHeight / line - 2}px`,
      textAlign: `center`,
      color: `rgb(207, 102, 102)`,
      backgroundColor: `rgb(63, 107, 172)`,
      float: `left`,
      borderRadius: `2px`,
      cursor: `pointer`,
      lineHeight: `${saoleiDIv.clientHeight / line - 2}px`,
      fontSize: `${saoleiDIv.clientHeight / line - 2 - 10}px`,
    }
    Object.keys(domStyle).forEach(key => {
      fanggeDom.style[key] = domStyle[key]
    })
    fanggeDom.className = 'saolei_fangge'
    fanggeDom.innerHTML = `<span style="display:none;">${saoleiArrObj[i].content}</span>`
    pageDom.appendChild(fanggeDom)
    saoleiArrObj[i].dom = fanggeDom
  }
  saoleiDIv.appendChild(pageDom)

  //点击事件 (打开区块)
  saoleiDIv.addEventListener('click', saoleikaishi)
  //=>点击函数
  function saoleikaishi(e) {
    e = e || window.event
    let target = e.target || e.srcElement
    if (target.nodeName === 'P') {
      let targetIndex
      for (let i = 0; i < saoleiArrObj.length; i++) {
        if (saoleiArrObj[i].dom === target) {
          targetIndex = i
        }
      }
      if (saoleiArrObj[targetIndex].state != 'Q'/*已插旗*/) {
        target.firstElementChild.style.display = 'inline'
        target.style.backgroundColor = 'rgb(109, 164, 247)'
        saoleiArrObj[targetIndex].state = 'ON'

        //游戏失败
        if (saoleiArrObj[targetIndex].content === '雷') {
          console.log('游戏失败')
          //循环显示所有雷
          for (let i = 0; i < saoleiArrObj.length; i++) {
            if (saoleiArrObj[i].content === '雷') {
              saoleiArrObj[i].dom.style.backgroundColor = 'rgb(109, 164, 247)'
              saoleiArrObj[i].dom.style.backgroundImage = ``
              saoleiArrObj[i].dom.querySelector('span').style.display = 'inline'
            }
          }
          //关闭点击事件
          saoleiDIv.removeEventListener('click', saoleikaishi)
          //写入‘游戏失败’页面
          let youxijieshuDiv = document.createElement('div')
          youxijieshuDiv.innerText = '游戏失败'
          let youxijieshuDivStyle = {
            width: '200px',
            height: '70px',
            backgroundColor: 'rgba(252, 120, 120, 0.8)',
            position: 'absolute',
            top: 'calc(50% - 35px - 10px)',
            left: 'calc(50% - 100px)',
            zIndex: '10',
            borderRadius: '20px',
            textAlign: 'center',
            lineHeight: '70px',
            fontSize: '40px',
          }
          Object.keys(youxijieshuDivStyle).forEach(key => {
            youxijieshuDiv.style[key] = youxijieshuDivStyle[key]
          })
          saoleiDIv.appendChild(youxijieshuDiv)
        }//游戏失败 end

        //打开周围空白
        //数据中的‘雷’对应dom数组中的雷，减少dom操作，提高性能
        //定时器
        else if (!saoleiArrObj[targetIndex].content) {
          let polling = setInterval(() => {
            let domPool = []
            for (let i = 0; i < saoleiArrObj.length; i++) {
              if (!saoleiArrObj[i].content && saoleiArrObj[i].state == 'ON') {
                domPool.push(saoleiArrObj[i])
              }
            }
            if (!domPool.length) {
              clearInterval(polling)
              victoryFun() //游戏胜利
            }
            for (let i = 0; i < domPool.length; i++) {
              let X = domPool[i].X
              let Y = domPool[i].Y
              /*
                周围: (X-1,Y-1) (X,Y-1) (X+1,Y-1) (X-1,Y) (x+1,Y) (X-1,Y+1) (X,Y+1) (X+1,Y+1)
              */
              for (let j = 0; j < saoleiArrObj.length; j++) {
                let coordinates = `${saoleiArrObj[j].X},${saoleiArrObj[j].Y}`
                if (
                  coordinates == `${X - 1},${Y - 1}` ||
                  coordinates == `${X},${Y - 1}` ||
                  coordinates == `${X + 1},${Y - 1}` ||
                  coordinates == `${X - 1},${Y}` ||
                  coordinates == `${X + 1},${Y}` ||
                  coordinates == `${X - 1},${Y + 1}` ||
                  coordinates == `${X},${Y + 1}` ||
                  coordinates == `${X + 1},${Y + 1}`
                ) {
                  if (saoleiArrObj[j].state == 'OFF') {
                    saoleiArrObj[j].dom.firstElementChild.style.display = 'inline'
                    saoleiArrObj[j].dom.style.backgroundColor = 'rgb(109, 164, 247)'
                    saoleiArrObj[j].state = 'ON'
                  }
                }
              }
              domPool[i].state = 'ON2'
            }
          }, 20)
        }//打开周围空白 end

        //判断是否游戏胜利
        victoryFun()
        function victoryFun() {
          let fanggeOFF = saoleiArrObj.length //未打开的区块
          for (let i = 0; i < saoleiArrObj.length; i++) {
            if (saoleiArrObj[i].state == 'ON' || saoleiArrObj[i].state == 'ON2') {
              fanggeOFF -= 1
            }
          }
          if (fanggeOFF == num) {
            //关闭点击事件
            saoleiDIv.removeEventListener('click', saoleikaishi)
            //写入‘游戏胜利’页面
            let youxijieshuDiv = document.createElement('div')
            youxijieshuDiv.innerText = '游戏胜利'
            let youxijieshuDivStyle = {
              width: '200px',
              height: '70px',
              backgroundColor: 'rgba(252, 120, 120, 0.8)',
              position: 'absolute',
              top: 'calc(50% - 35px - 10px)',
              left: 'calc(50% - 100px)',
              zIndex: '10',
              borderRadius: '20px',
              textAlign: 'center',
              lineHeight: '70px',
              fontSize: '40px',
            }
            Object.keys(youxijieshuDivStyle).forEach(key => {
              youxijieshuDiv.style[key] = youxijieshuDivStyle[key]
            })
            saoleiDIv.appendChild(youxijieshuDiv)
          }
        }//判断是否游戏胜利 end
      }

    }
  }

  //阻止默认的右键菜单
  saoleiDIv.oncontextmenu = function () { return false; }
  //右击事件
  saoleiDIv.addEventListener('contextmenu', contextmenuFun)
  //=>右击函数
  function contextmenuFun(e) {
    e = e || window.event
    let target = e.target || e.srcElement
    if (target.nodeName === 'P') {
      let targetIndex
      for (let i = 0; i < saoleiArrObj.length; i++) {
        if (saoleiArrObj[i].dom === target) {
          targetIndex = i
        }
      }
      if (saoleiArrObj[targetIndex].state == 'OFF') {
        saoleiArrObj[targetIndex].state = 'Q'
        saoleiArrObj[targetIndex].dom.style.backgroundImage = `url('${flags}')`
        saoleiArrObj[targetIndex].dom.style.backgroundPosition = `center`
        saoleiArrObj[targetIndex].dom.style.backgroundSize = `66%`
        saoleiArrObj[targetIndex].dom.style.backgroundRepeat = `no-repeat`
      }
      else if (saoleiArrObj[targetIndex].state == 'Q') {
        saoleiArrObj[targetIndex].state = 'OFF'
        saoleiArrObj[targetIndex].dom.style.backgroundImage = ``
      }
    }
  }
}


