console.log('这里是background.js')


let chapterArr = [] // 章节列表数据
let novelArr = chromeNovelData.split('\n').filter((item, index) => {
  return item.trim()
})
for (let i = 0; i < novelArr.length; i++) {
  if (/^\s*第\S+章.*$/.test(novelArr[i])) {
    // console.log(item, index)
    chapterArr.push({
      title: novelArr[i],
      index: i
    })
  }
}

let i_i = localStorage.getItem('i_i') ? localStorage.getItem('i_i') - 0 : 0
// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // console.log('收到content消息', request)
  i_i += request.code
  i_i < 0 ? i_i = 0 : i_i
  i_i >= novelArr.length ? i_i = novelArr.length - 1 : i_i
  localStorage.setItem('i_i', i_i)
  sendResponse({
    i_i,
    novelArr
  })
})

// 向 popup 传递章节列表数据
function chapterArrFun() {
  return chapterArr
}

// 接收 popup 的章节跳转
function chapterJump(index) {
  console.log('章节跳转', index)
  i_i = index - 0

  // 向 content 主动发送消息
  sendMessageToContentScript({
    i_i,
    novelArr
  }, function (response) {
    console.log('来自content的回复：' + response)
  })
}


// 向 content 主动发送消息
function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
      if (callback) callback(response)
    })
  })
}
