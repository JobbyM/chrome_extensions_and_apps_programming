window.addEventListener('mouseup',function(){
  var selection = window.getSelection();
  if(selection.anchorOffset != selection.focusOfffset){
    chrome.runtime.sendMessage(selection.toString());
  }
},false);
