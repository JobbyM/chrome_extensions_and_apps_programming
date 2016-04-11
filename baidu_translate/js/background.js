chrome.contextMenus.create({
  'type':'normal',
  'title':'使用Baidu翻译......',
  'contexts':['selection'],
  'id':'cn',
  'onclick':translate
});

function translate(info, tab){
  var url = 'http://fanyi.baidu.com/#en/zh/' + info.selectionText;
  window.open(url, '_blank');
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  chrome.contextMenus.update('cn',{
    'title':'使用Baidu翻译“'+ message +'”'
  });
});
