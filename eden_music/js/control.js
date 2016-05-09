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

document.getElementById('E_prevBtn').addEventListener('click',function(){

},false);

document.getElementById('E_playBtn').addEventListener('click',function(){

  var currentPlayer = new BasePlayer();
  currentPlayer.init();
  currentPlayer.run();
  return false;
},false);

document.getElementById('E_nextBtn').addEventListener('click',function(){

},false);
