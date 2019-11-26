
export default function ga () {
  var baiduTj = document.getElementById('baidu_tj')
  baiduTj && baiduTj.parentNode.removeChild(baiduTj)
  var hm = document.createElement('script')
  hm.src = 'https://hm.baidu.com/hm.js?7daac41ef5a814fc08b89be509a29d2a'
  hm.id = 'baidu_tj'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)
}
