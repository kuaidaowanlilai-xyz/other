let iframeW, iframeWDocu
iframeW = document.querySelector('iframe')
iframeWDocu = iframeW.contentWindow
console.log('iframeW', iframeW, iframeWDocu)