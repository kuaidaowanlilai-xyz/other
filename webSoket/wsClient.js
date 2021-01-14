// base64 转 blob
function base64ToBlob({
  b64data = '',
  contentType = '',
  sliceSize = 512
} = {}) {
  return new Promise((resolve, reject) => {
    // 使用 atob() 方法将数据解码
    let byteCharacters = atob(b64data);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);
      let byteNumbers = [];
      for (let i = 0; i < slice.length; i++) {
        byteNumbers.push(slice.charCodeAt(i));
      }
      // 8 位无符号整数值的类型化数组。内容将初始化为 0。
      // 如果无法分配请求数目的字节，则将引发异常。
      byteArrays.push(new Uint8Array(byteNumbers));
    }
    let result = new Blob(byteArrays, {
      type: contentType
    })
    result = Object.assign(result, {
      // 这里一定要处理一下 URL.createObjectURL
      preview: URL.createObjectURL(result),
      name: `XXX.png`
    });
    resolve(result)
  })
}
// base64 转 blob --end

const videoDiv = document.querySelector('#video')

const client = new WebSocket("ws://localhost:23003")

client.onopen = function () {
  client.send(JSON.stringify({
    // user: window.navigator.userAgent.toLowerCase(),
    user: 'Chrome',
    msg: ''
  }))
}

client.onmessage = function (socketData) {
  let data = JSON.parse(socketData.data)
  document.querySelector("#chatroom").innerHTML += `${data.user}：${data.msg}</br>`
  //加载视频
  // console.log('加载视频', data.videoBase64)
  if (data.videoBase64) {
    let videoBase64 = data.videoBase64.split(',')[1]
    base64ToBlob({
      b64data: videoBase64,
      contentType: 'video/x-matroska;codecs=avc1',
    }).then(res => {
      console.log('qqqqq', res)
      videoDiv.src = window.URL.createObjectURL(res)
      videoDiv.play()
    })
  }
}

client.onclose = function () {
  alert("服务器已关闭(closed)")
}
client.onerror = function () {
  alert("服务器错误(error)")
}



function send() {
  if (sendInput.value) {
    client.send(JSON.stringify({
      user: 'Chrome',
      msg: sendInput.value,
      chatObject: 'electron'
    }))
    sendInput.value = ""
  }
}
document.onkeyup = function (e) {
  if (e.keyCode == 13) {
    send()
  }
}
sendButton.onclick = function () {
  send()
}
qingping.onclick = function () {
  chatroom.innerHTML = ''
}