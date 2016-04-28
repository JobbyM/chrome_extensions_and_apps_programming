var current_window = chrome.app.window.current();

document.getElementById('minimize').addEventListener('click',function(){
  current_window.minimize();
},false);

document.getElementById('close').addEventListener('click',function(){
  current_window.hide();
},false);
