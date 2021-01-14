function Saolei(id, line = 10, column = 10, num = 10) {

  let saoleiDIv = document.querySelector(id) //传入的dom
  let saoleiArrObj = [] //渲染页面所需要的数据

  /* 创建10×10的数组对象
    {
      X: 0, //坐标X
      Y: 0, //坐标Y
      content: 0, //内容
      state: 'OFF', //区块状态: 'OFF'关闭, 'ON'打开, 'Q'插旗
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

  //点击事件 (交互)
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
            saoleiArrObj[i].dom.querySelector('span').style.display = 'inline'
          }
        }
        //关闭点击事件
        saoleiDIv.removeEventListener('click', saoleikaishi)
        //写入‘游戏失败’页面
        let youxijieshuDiv = document.createElement('div')
        youxijieshuDiv.innerText = '游戏结束'
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
      //递归
      else if (!saoleiArrObj[targetIndex].content) {
        recursive(targetIndex)
        function recursive(index) {
          if (!saoleiArrObj[index].content) {
            let X = saoleiArrObj[index].X
            let Y = saoleiArrObj[index].Y
            /*
              周围
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
                if (saoleiArrObj[j].state != 'ON') {
                  saoleiArrObj[j].dom.firstElementChild.style.display = 'inline'
                  saoleiArrObj[j].dom.style.backgroundColor = 'rgb(109, 164, 247)'
                  saoleiArrObj[j].state = 'ON'
                  recursive(j)
                }
              }
            }
          }
        }
      }//打开周围空白 end

    }
  }
}


