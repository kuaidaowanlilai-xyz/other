console.log('这是 simple-chrome-plugin-demo 的content-script！ v1.2')

const body = document.body
const chromeNovelRead = document.createElement('div')
chrome.runtime.sendMessage({msg: '请后台返回小说数据给我', code: 0}, function (response) {

  // console.log('收到来自后台的回复：' + response.i_i);
  chromeNovelRead.innerText = response.novelArr[response.i_i]
})
chromeNovelRead.classList.add('chrome_novel_read')
body.appendChild(chromeNovelRead)
// 默认隐藏(用行内样式，后面会用于判断)
chromeNovelRead.style.display = 'none'


body.addEventListener('keydown', (e) => {
  // console.log(e)
  if (e.code === 'Backquote' || e.code === 'ArrowRight') {
    if (e.altKey) {
      if (chromeNovelRead.style.display === 'none') {
        chromeNovelRead.style.display = 'block'
      } else {
        chromeNovelRead.style.display = 'none'
      }
    } else {
      if (chromeNovelRead.style.display !== 'none') {
        chrome.runtime.sendMessage({msg: '请后台返回小说数据给我', code: 1}, function (response) {
          // console.log('收到来自后台的回复：' + response.i_i);
          chromeNovelRead.innerText = response.novelArr[response.i_i]
        })
      }
    }
  }
  if (e.code === 'ArrowLeft') {
    if (chromeNovelRead.style.display !== 'none') {
      chrome.runtime.sendMessage({msg: '请后台返回小说数据给我', code: -1}, function (response) {
        // console.log('收到来自后台的回复：' + response.i_i);
        chromeNovelRead.innerText = response.novelArr[response.i_i]
      })
    }
  }
})

// 接收 background 发来的数据
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  sendResponse('content收到了你的消息')
  chromeNovelRead.style.display = 'block'
  chromeNovelRead.innerText = request.novelArr[request.i_i]
})


