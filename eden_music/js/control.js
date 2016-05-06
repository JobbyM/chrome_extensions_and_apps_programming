var current_window = chrome.app.window.current();

document.getElementById('minimize').addEventListener('click',function(){
  current_window.minimize();
},false);

document.getElementById('close').addEventListener('click',function(){
  current_window.hide();
},false);

document.getElementById('maximize').addEventListener('click',function(){
  current_window.isMaximized ?
    current_window.restore():
    current_window.maximize();
},false);
