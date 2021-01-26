let bg = chrome.extension.getBackgroundPage()

/*
   章节列表数据
    [{
      title: '',
      index: ''
    }]
 */
let chapterArr = bg.chapterArrFun()
console.log('你好，我是popup！', chapterArr)

const saoleiDIv = document.querySelector('#saoleiDIv')
let divStr = ''
for (let i = 0; i < chapterArr.length; i++) {
  divStr += `<div class="listItem" title="${chapterArr[i].title}">
                ${chapterArr[i].title.replace(/（.*求.+票。*）/, '')}
                <span class="indexSpan">${chapterArr[i].index}</span>
            </div>`
}
saoleiDIv.innerHTML = divStr

saoleiDIv.addEventListener('click', e => {
  if (e.target.className === 'listItem') {
    let i_i = e.target.querySelector('.indexSpan').innerText - 0
    bg.chapterJump(i_i)
    localStorage.setItem('i_i', i_i)
  }
})

