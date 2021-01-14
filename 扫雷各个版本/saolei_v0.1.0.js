function Saolei(id) {
  this.ele = document.querySelector(id)
  this.jieshu = document.querySelector('.youxijieshu')
  // console.log(this.jieshu)

  this.chulishuzu()
  this.chuangjianfangge()
  this.yinqing2()
  this.quxiaoxuanzhong()
}


//处理数组
Saolei.prototype.chulishuzu = function () {

  // console.log(Math.floor(Math.random() * 10))


  //创建10×10的数组
  let arr = []
  for (var i = 0; i < 10; i++) {
    arr.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  }

  // console.log(arr)


  //随机给数组赋值十个9 (9即是雷)
  for (var j = 0; j < 10; j++) {

    let suiX = Math.floor(Math.random() * 10)
    let suiY = Math.floor(Math.random() * 10)

    //排除重复赋值9
    while (true) {
      if (arr[suiX][suiY] === 9) {
        suiX = Math.floor(Math.random() * 10)
        suiY = Math.floor(Math.random() * 10)
      } else {
        break
      }
    }

    arr[suiX][suiY] = 9

  }
  // console.log(arr)



  //把9周围加一
  for (var k1 = 0; k1 < 10; k1++) {
    for (var k2 = 0; k2 < 10; k2++) {
      if (arr[k1][k2] >= 9) {
        // console.log(arr[k1][k2])
        if (k1 === 0) {

          if (k2 === 0) {
            arr[k1][k2 + 1]++;
            arr[k1 + 1][k2]++;
            arr[k1 + 1][k2 + 1]++;
          } else if (k2 === 9) {
            arr[k1][k2 - 1]++;
            arr[k1 + 1][k2]++;
            arr[k1 + 1][k2 - 1]++;
          } else {
            arr[k1][k2 + 1]++;
            arr[k1][k2 - 1]++;
            arr[k1 + 1][k2]++;
            arr[k1 + 1][k2 + 1]++;
            arr[k1 + 1][k2 - 1]++;
          }

        } else if (k1 === 9) {

          if (k2 === 0) {
            arr[k1][k2 + 1]++;
            arr[k1 - 1][k2]++;
            arr[k1 - 1][k2 + 1]++;
          } else if (k2 === 9) {
            arr[k1][k2 - 1]++;
            arr[k1 - 1][k2]++;
            arr[k1 - 1][k2 - 1]++;
          } else {
            arr[k1][k2 + 1]++;
            arr[k1][k2 - 1]++;
            arr[k1 - 1][k2]++;
            arr[k1 - 1][k2 + 1]++;
            arr[k1 - 1][k2 - 1]++;
          }

        } else {

          if (k2 === 0) {
            arr[k1][k2 + 1]++;
            arr[k1 + 1][k2]++;
            arr[k1 + 1][k2 + 1]++;
            arr[k1 - 1][k2]++;
            arr[k1 - 1][k2 + 1]++;
          } else if (k2 === 9) {
            arr[k1][k2 - 1]++;
            arr[k1 + 1][k2]++;
            arr[k1 + 1][k2 - 1]++;
            arr[k1 - 1][k2]++;
            arr[k1 - 1][k2 - 1]++;
          } else {
            arr[k1][k2 + 1]++;
            arr[k1][k2 - 1]++;
            arr[k1 + 1][k2]++;
            arr[k1 + 1][k2 + 1]++;
            arr[k1 + 1][k2 - 1]++;
            arr[k1 - 1][k2]++;
            arr[k1 - 1][k2 + 1]++;
            arr[k1 - 1][k2 - 1]++;
          }

        }

      }

    }
  }

  console.log(arr)

  this.arr_arr = arr

}


//创建方格
Saolei.prototype.chuangjianfangge = function () {
  // console.log(this.arr_arr)

  let str = ''
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      if (this.arr_arr[i][j] >= 9) {
        this.arr_arr[i][j] = '雷'
      }
      // console.log(this.arr_arr[i][j])
      str += `<p shifoudakai="fou" ><span>${this.arr_arr[i][j]}</span></p>`
    }
  }
  this.ele.innerHTML = str
}


//开始游戏
Saolei.prototype.yinqing2 = function () {
  this.ps = this.ele.querySelectorAll('p') //返回的是伪数组！！伪数组！！伪伪伪伪伪伪！

  //循环 隐藏
  for (let i = 0; i < this.ps.length; i++) {
    let span = this.ps[i].querySelector('span')
    span.style.display = 'none'
  }

  _this = this

  //点击事件
  this.ele.addEventListener('click', saoleikaishi)

  //点击函数
  function saoleikaishi(e) {
    e = e || window.event
    let target = e.target || e.srcElement

    if (target.nodeName === 'P') {
      target.firstElementChild.style.display = 'inline'
      target.style.backgroundColor = 'rgb(109, 164, 247)'
      // console.log(target.innerText)

      if (target.innerText === '雷') {
        //调用游戏结束函数
        youxijieshu()
      }

      //点击的时候删除标记属性(shifoudakai)
      target.setAttribute('shifoudakai', 'shi')

    }
    // console.log(target.nodeName)


    //只要点击就遍历
    for (let kk = 0; kk < 20; kk++) {
      //先(再)遍历所有块块，把块块包含的数字放在一个数组里面
      let arrNum = []
      for (var k = 0; k < _this.ps.length; k++) {
        arrNum.push(_this.ps[k].innerText)
      }
      // console.log(arrNum)

      //遍历上面的数组，如果是 '0'  ，则调用函数处理
      for (let i = 0; i < arrNum.length; i++) {
        if (arrNum[i] === '0') {
          xianshizhouwei(i)

          //去掉0，让其不显示
          _this.ps[i].firstElementChild.innerText = ''
        }
      }
      // console.log(arrNum)

    }

    //只要点击就检测是否胜利
    //调用检测函数
    shengli()

  }



  //显示周围函数
  function xianshizhouwei(index) {

    let index_arr = [index - 1, index + 1, index + 10, index + 10 - 1, index + 10 + 1, index - 10, index - 10 - 1, index - 10 + 1]
    // console.log(index_arr)

    //处理‘相邻’数组
    for (let i = 0; i < index_arr.length; i++) {
      if (index_arr[i] < 0 || index_arr[i] > 99) {
        index_arr[i] = index
      }
    }
    // console.log(index_arr)

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

      _this.ps[index_arr[j]].firstElementChild.style.display = 'inline'
      _this.ps[index_arr[j]].style.backgroundColor = 'rgb(109, 164, 247)'

      //打开，就改标记
      _this.ps[index_arr[j]].setAttribute('shifoudakai', 'shi')


    }
  }



  //游戏结束函数
  function youxijieshu() {
    console.log('游戏结束')

    //循环 显示所有雷
    for (let j = 0; j < _this.ps.length; j++) {

      let span = _this.ps[j].querySelector('span')
      if (span.innerText === '雷') {
        span.style.display = 'inline'
        span.parentNode.style.backgroundColor = 'rgb(148, 112, 245)'

        //改变标记
        span.parentNode.setAttribute('shifoudakai', 'lei')
      }
    }

    //关闭点击事件监听
    _this.ele.removeEventListener('click', saoleikaishi)
    _this.jieshu.style.display = 'block'
  }

  //游戏胜利函数
  function shengli() {

    let weidakaidekuai = 0
    for (let i = 0; i < _this.ps.length; i++) {
      // console.log(_this.ps[i].getAttribute('shifoudakai'))
      if (_this.ps[i].getAttribute('shifoudakai') === 'lei') {
        return
      }
      if (_this.ps[i].getAttribute('shifoudakai') === 'fou') {
        weidakaidekuai += 1
      }
    }
    console.log(weidakaidekuai)
    if (weidakaidekuai === 10) {
      console.log('胜利')
      _this.jieshu.innerText = '胜  利'
      youxijieshu()
    }

  }

}


// 取消选中状态
Saolei.prototype.quxiaoxuanzhong = function () {
  document.addEventListener('selectstart', function (e) {
    e = e || window.event
    if (e.preventDefault) {
      e.preventDefault()
    } else {
      e.returnValue = false
    }
  })
}