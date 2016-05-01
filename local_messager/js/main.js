document.getElementById('msg').addEventListener('keyup', function(e){
  if(e.keyCode == 13){
    chrome.runtime.sendMessage({
      action: 'send',
      msg: encodeURIComponent(this.value)
    });
    this.value = '';
  }
},false);

chrome.runtime.onMessage.addListener(function(message, sender, callback){
  if(message.action == 'receive'){
    var el = document.createElement('div');
    el.textContent = decodeURIComponent(message.msg);
    document.getElementById('history').appendChild(el);
  }
});
