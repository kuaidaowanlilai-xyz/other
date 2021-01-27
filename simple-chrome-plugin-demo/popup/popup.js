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
  let fontColor = ''
  let bgI_i = bg.bgLocalStorage().getItem('i_i')
  if (bgI_i > chapterArr[i].index && bgI_i < chapterArr[i + 1].index){
    fontColor = 'style="color: #2aa1ff"'
  }
    divStr += `<div class="listItem" ${fontColor} title="${chapterArr[i].title}">
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

