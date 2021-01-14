function Saolei(id) {
  this.saoleiDIv = document.querySelector(id)

  this.saoleiArr = []

  this.chuLiShuZu() //处理数组
  this.chuLiYeMian() //处理页面
  this.saoleiStyle() //写入页面样式
  this.yinqing() //开始游戏
}


//处理数组
Saolei.prototype.chuLiShuZu = function () {

  //创建10×10的数组
  let saoleiArr = []
  for (let i = 0; i < 10; i++) {
    saoleiArr.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  }

  //随机给数组赋值十个9 (9即是雷)
  for (let j = 0; j < 10; j++) {

    let zuobiaoX = Math.floor(Math.random() * 10)
    let zuobiaoY = Math.floor(Math.random() * 10)

    //排除重复赋值9
    while (true) {
      if (saoleiArr[zuobiaoX][zuobiaoY] === 9) {
        zuobiaoX = Math.floor(Math.random() * 10)
        zuobiaoY = Math.floor(Math.random() * 10)
      } else {
        break
      }
    }

    saoleiArr[zuobiaoX][zuobiaoY] = 9
  }

  //把9周围加一
  for (let X = 0; X < 10; X++) {
    for (let Y = 0; Y < 10; Y++) {
      if (saoleiArr[X][Y] >= 9) { //可能被加一后大于9
        /* 不合适的情况
            X-1 < 0
            Y-1 < 0
            X+1 > 9
            Y+1 > 9
        */
        if (!(X - 1 < 0 || Y - 1 < 0)) saoleiArr[X - 1][Y - 1] += 1
        if (!(Y - 1 < 0)) saoleiArr[X][Y - 1] += 1
        if (!(X + 1 > 9 || Y - 1 < 0)) saoleiArr[X + 1][Y - 1] += 1
        if (!(X - 1 < 0)) saoleiArr[X - 1][Y] += 1
        if (!(X + 1 > 9)) saoleiArr[X + 1][Y] += 1
        if (!(X - 1 < 0 || Y + 1 > 9)) saoleiArr[X - 1][Y + 1] += 1
        if (!(Y + 1 > 9)) saoleiArr[X][Y + 1] += 1
        if (!(X + 1 > 9 || Y + 1 > 9)) saoleiArr[X + 1][Y + 1] += 1
      }
    }
  }

  this.saoleiArr = saoleiArr
  console.log('', saoleiArr)
}

//处理页面
Saolei.prototype.chuLiYeMian = function () {
  let str = ''
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      if (this.saoleiArr[i][j] >= 9) {
        this.saoleiArr[i][j] = '雷'
      }
      if (this.saoleiArr[i][j] == 0) {
        this.saoleiArr[i][j] = ''
      }
      // console.log(this.arr_arr[i][j])
      str += `
      <p class="saolei_fangge" tag="${this.saoleiArr[i][j]}">
        <span style="display:none;">${this.saoleiArr[i][j]}</span>
      </p>`
    }
  }
  this.saoleiDIv.innerHTML = str
}

//开始游戏
Saolei.prototype.yinqing = function () {
  _this = this
  //点击事件
  this.saoleiDIv.addEventListener('click', saoleikaishi)

  //点击函数
  function saoleikaishi(e) {
    let saolei_ps = _this.saoleiDIv.querySelectorAll('p') //返回的是伪数组！！伪数组！！伪伪伪伪伪伪！
    e = e || window.event
    let target = e.target || e.srcElement

    if (target.nodeName === 'P') {
      target.firstElementChild.style.display = 'inline'
      target.style.backgroundColor = 'rgb(109, 164, 247)'

      if (target.getAttribute('tag') === '雷') {
        //游戏结束
        console.log('游戏结束')
        //循环 显示
        for (let i = 0; i < saolei_ps.length; i++) {
          if (saolei_ps[i].getAttribute('tag') === '雷') {
            saolei_ps[i].style.backgroundColor = 'rgb(109, 164, 247)'
            saolei_ps[i].querySelector('span').style.display = 'inline'
          }
        }
      }

      
      if (!target.getAttribute('tag')) {
          //打开周围
          let index_arr = [index - 1, index + 1, index + 10, index + 10 - 1, index + 10 + 1, index - 10, index - 10 - 1, index - 10 + 1]

          //处理‘相邻’数组
          for (let i = 0; i < index_arr.length; i++) {
            if (index_arr[i] < 0 || index_arr[i] > 99) {
              index_arr[i] = index
            }
          }

          //显示周围
          for (let j = 0; j < index_arr.length; j++) {

            if ((index + 1) % 10 === 0) {
              if (j === 1 || j === 4 || j === 7) {
                continue
              }
            }

            if ((index + 1) % 10 === 1) {
              if (j === 0 || j === 3 || j === 6) {
                continue
              }
            }

            saolei_ps[index_arr[j]].firstElementChild.style.display = 'inline'
            saolei_ps[index_arr[j]].style.backgroundColor = 'rgb(109, 164, 247)'

            //打开，就改标记
            saolei_ps[index_arr[j]].setAttribute('shifoudakai', 'shi')
        }
      }
    }
  }
}



//处理页面样式
Saolei.prototype.saoleiStyle = function () {
  let style = document.createElement('style')
  style.innerHTML = `
  `
  document.head.appendChild(style)
  console.log('llll', style, document.head)
}