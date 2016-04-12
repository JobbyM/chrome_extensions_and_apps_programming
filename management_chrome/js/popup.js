chrome.tabs.getCurrent(function(tab){
  console.log(tab);
});

chrome.tabs.query({
  active: true
},function(tabArray){
  console.log(tabArray);
  for(var i = 0 , len = tabArray.length; i < len; i ++){

  }

  var tabId = tabArray[0].id;
  var windowId = tabArray[0].windowId;
  chrome.tabs.get(tabId, function(tab){
    console.log(tab);
  });

  // 语言
  chrome.tabs.detectLanguage(tabId, function(lang){
    console.log('The primary language of the tab is ' + lang);
  });

  // 截图
  chrome.tabs.captureVisibleTab(windowId, {
    format: 'jpeg',
    quality: 50
  }, function(dataUrl){
    window.open(dataUrl, 'tabCapture');
  });

});
