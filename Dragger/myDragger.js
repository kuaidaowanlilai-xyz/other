/*
用法：
  let myDragger = new MyDragger()
  myDragger.dragger(整个要移动的dom节点, 被拖拽的dom节点)
注意：两个参数都需是 dom对象
*/

function MyDragger(){
  this.draggerDivArr = []
  this.zIndexArr = []
}

//拖拽
MyDragger.prototype.dragger = function(draggerDiv, titleDiv){
  //只要调用此函数，就会向数组内存储一个dom对象
  this.draggerDivArr.push(draggerDiv)
  this.zIndexArr.push(draggerDiv.style.zIndex)

  //准备变量
  let offsetX, offsetY, parentNodeOffsetLeft, parentNodeOffsetTop
    draggerDivOpacity = draggerDiv.style.opacity
    htmlDiv = document.querySelector('html')

  //禁止选中
  titleDiv.style.userSelect = 'none'
  
  //鼠标移动函数
  function mousemoveFun(e){
    // console.log(e.clientX, e.clientY, offsetX, offsetY)
    //移动
    draggerDiv.style.left = `${e.clientX - offsetX - parentNodeOffsetLeft}px`
    draggerDiv.style.top = `${e.clientY - offsetY - parentNodeOffsetTop}px`
  }

  //鼠标按下窗口
  draggerDiv.addEventListener('mousedown', e => {
    //将被点击的窗口置于最上层
    for(let i = 0; i < this.draggerDivArr.length; i++){
      this.draggerDivArr[i].style.zIndex = this.zIndexArr[i]
    }
    draggerDiv.style.zIndex = '2020'
  })

  //鼠标按下窗口头部
  titleDiv.addEventListener('mousedown', e => {
    // console.log('鼠标按下窗口头部')
    //存储鼠标在点击对象内部的位置
    offsetX = e.offsetX
    offsetY = e.offsetY
    //获取父元素位置信息（为防止分辨率变化，在此处动态获取）
    parentNodeOffsetLeft = draggerDiv.parentNode.offsetLeft,
    parentNodeOffsetTop = draggerDiv.parentNode.offsetTop
    //打开鼠标移动事件
    htmlDiv.addEventListener('mousemove', mousemoveFun)
    //样式配置
    draggerDiv.style.opacity = '.8'
  })

  //鼠标抬起窗口头部
  titleDiv.addEventListener('mouseup', e => {
    // console.log('鼠标抬起窗口头部')
    //关闭鼠标移动事件
    htmlDiv.removeEventListener('mousemove', mousemoveFun)
    //样式配置
    draggerDiv.style.opacity = draggerDivOpacity
  })

  //鼠标移出 html 页面
  htmlDiv.addEventListener('mouseleave', e => {
    // console.log('鼠标移出 html 页面')
    //关闭鼠标移动事件
    htmlDiv.removeEventListener('mousemove', mousemoveFun)
  })

}