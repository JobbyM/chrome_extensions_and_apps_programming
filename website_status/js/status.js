function httpRequest(url,callback){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      callback(true);
    }
  }
  xhr.onerror = function(){
    callback(false);
  }
  xhr.send();
}

function checkStatus(){
  httpRequest('https://www.baidu.com/',function(status){
    //document.getElementById('status').innerText = status ? '上线成功':'上线失败';
    chrome.browserAction.setIcon({path: 'images/' + (status?'online.png':'offline.png')});
    setTimeout(checkStatus, 5000)
  })
}

checkStatus();
