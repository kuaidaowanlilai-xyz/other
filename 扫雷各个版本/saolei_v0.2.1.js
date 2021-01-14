function Saolei(id, line = 10, column = 10, num = 10) {
  this.saoleiDIv = document.querySelector(id)

  this.chuLiShuZu(line - 0, column - 0, num - 0) //处理 数组 与 页面
  // this.saoleiStyle() //写入页面样式
  this.yinqing() //开始游戏
}


//处理数组
/*
  line: 行,
  column: 列
*/
Saolei.prototype.chuLiShuZu = function (line, column, num) {

  let saoleiArrObj = []
  /* 创建10×10的数组对象
    {
      X: 0, //坐标X
      Y: 0, //坐标Y
      content: 0, //内容
      tag: '', //标记
    }
  */
  for (let Y = 0; Y < line; Y++) {
    for (let X = 0; X < column; X++) {
      saoleiArrObj.push({
        X: X,
        Y: Y,
        tag: '',
        content: 0,
      })
    }
  }

  //随机给数组赋值十个9 (9即是雷)
  for (let j = 0; j < num; j++) {
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
  for (let i = 0; i < line * column; i++) {
    if (saoleiArrObj[i].content >= 9) { //可能被加一后大于9
      let X = saoleiArrObj[i].X
      let Y = saoleiArrObj[i].Y
      /*
        i 的周围
        X-1, Y-1
        X, Y-1
        X+1, Y-1
        X-1, Y
        x+1, Y
        X-1, Y+1
        X, Y+1
        X+1, Y+1
      */
      for (let j = 0; j < line * column; j++) {
        if (
          (saoleiArrObj[j].X == X - 1 && saoleiArrObj[j].Y == Y - 1) ||
          (saoleiArrObj[j].X == X && saoleiArrObj[j].Y == Y - 1) ||
          (saoleiArrObj[j].X == X + 1 && saoleiArrObj[j].Y == Y - 1) ||
          (saoleiArrObj[j].X == X - 1 && saoleiArrObj[j].Y == Y) ||
          (saoleiArrObj[j].X == X + 1 && saoleiArrObj[j].Y == Y) ||
          (saoleiArrObj[j].X == X - 1 && saoleiArrObj[j].Y == Y + 1) ||
          (saoleiArrObj[j].X == X && saoleiArrObj[j].Y == Y + 1) ||
          (saoleiArrObj[j].X == X + 1 && saoleiArrObj[j].Y == Y + 1)
        ) {
          saoleiArrObj[j].content += 1
        }
      }
    }
  }

  for (let k = 0; k < line * column; k++) {
    if (saoleiArrObj[k].content >= 9) {
      saoleiArrObj[k].content = '雷'
    }
    if (saoleiArrObj[k].content == 0) {
      saoleiArrObj[k].content = ''
    }
  }

  // console.log(saoleiArrObj)

  let pageStr = ''
  for (let i = 0; i < line * column; i++) {
    pageStr += `
      <p style="
          margin: 1px;
          width: ${this.saoleiDIv.clientWidth / column - 2}px;
          height: ${this.saoleiDIv.clientHeight / line - 2}px;
          text-align: center;
          color: rgb(207, 102, 102);
          background-color: rgb(63, 107, 172);
          float: left;
          border-radius: 2px;
          cursor: pointer;
          line-height: ${this.saoleiDIv.clientHeight / line - 2}px;
          font-size: ${this.saoleiDIv.clientHeight / line - 2 - 10}px;
        "
        class="saolei_fangge"
        X="${saoleiArrObj[i].X}"
        Y="${saoleiArrObj[i].Y}"
        content="${saoleiArrObj[i].content}"
        tag="${saoleiArrObj[i].tag}"
      >
        <span style="display:none;">${saoleiArrObj[i].content}</span>
      </p>`
  }
  this.saoleiDIv.innerHTML = pageStr
}

//开始游戏
Saolei.prototype.yinqing = function () {
  _this = this
  //点击事件
  this.saoleiDIv.addEventListener('click', saoleikaishi)

  //点击函数
  function saoleikaishi(e) {
    let saolei_ps = _this.saoleiDIv.querySelectorAll('p.saolei_fangge') //返回的是伪数组！！伪数组！！伪伪伪伪伪伪！
    e = e || window.event
    let target = e.target || e.srcElement

    if (target.nodeName === 'P') {
      target.firstElementChild.style.display = 'inline'
      target.style.backgroundColor = 'rgb(109, 164, 247)'
      target.setAttribute('tag', 'show')

      //游戏失败
      if (target.getAttribute('content') === '雷') {
        console.log('游戏失败')
        //循环显示所有雷
        for (let i = 0; i < saolei_ps.length; i++) {
          if (saolei_ps[i].getAttribute('content') === '雷') {
            saolei_ps[i].style.backgroundColor = 'rgb(109, 164, 247)'
            saolei_ps[i].querySelector('span').style.display = 'inline'
          }
        }
        //关闭点击事件
        _this.saoleiDIv.removeEventListener('click', saoleikaishi)
        //加载‘游戏失败’页面样式
        let youxijieshuDiv = document.createElement('div')
        youxijieshuDiv.innerText = '游戏结束'
        let youxijieshuDivStyte = {
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
        Object.keys(youxijieshuDivStyte).forEach(key => {
          youxijieshuDiv.style[key] = youxijieshuDivStyte[key]
        })
        _this.saoleiDIv.appendChild(youxijieshuDiv)
      }

      //打开周围空白(递归一下)
      openAround(target)
      function openAround(target) {
        if (!target.getAttribute('content')) {
          let X = target.getAttribute('x') - 0
          let Y = target.getAttribute('y') - 0
          /*
            周围
            X-1, Y-1
            X, Y-1
            X+1, Y-1
            X-1, Y
            x+1, Y
            X-1, Y+1
            X, Y+1
            X+1, Y+1
          */
          for (let j = 0; j < saolei_ps.length; j++) {
            if (
              (saolei_ps[j].getAttribute('x') == X - 1 && saolei_ps[j].getAttribute('y') == Y - 1) ||
              (saolei_ps[j].getAttribute('x') == X && saolei_ps[j].getAttribute('y') == Y - 1) ||
              (saolei_ps[j].getAttribute('x') == X + 1 && saolei_ps[j].getAttribute('y') == Y - 1) ||
              (saolei_ps[j].getAttribute('x') == X - 1 && saolei_ps[j].getAttribute('y') == Y) ||
              (saolei_ps[j].getAttribute('x') == X + 1 && saolei_ps[j].getAttribute('y') == Y) ||
              (saolei_ps[j].getAttribute('x') == X - 1 && saolei_ps[j].getAttribute('y') == Y + 1) ||
              (saolei_ps[j].getAttribute('x') == X && saolei_ps[j].getAttribute('y') == Y + 1) ||
              (saolei_ps[j].getAttribute('x') == X + 1 && saolei_ps[j].getAttribute('y') == Y + 1)
            ) {
              if (!saolei_ps[j].getAttribute('tag')) {
                saolei_ps[j].firstElementChild.style.display = 'inline'
                saolei_ps[j].style.backgroundColor = 'rgb(109, 164, 247)'
                saolei_ps[j].setAttribute('tag', 'show')
                openAround(saolei_ps[j])
              }
            }
          }
        } else {
          return
        }
      }

    }
  }
}



// //写入页面样式
// Saolei.prototype.saoleiStyle = function () {
//   let style = document.createElement('style')
//   style.innerHTML = `
//   `
//   document.head.appendChild(style)
//   console.log('llll', style, document.head)
// }