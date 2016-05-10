var current_window = chrome.app.window.current();
var currentPlayer = null;
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
  event.preventDefault();
},false);

document.getElementById('E_playBtn').addEventListener('click',function(){
  event.preventDefault();
  currentPlayer = new BasePlayer();
  var __playList = [{
    'actionURL' : 'data/Star Sky_Two Steps From Hell_Battlecry.mp3'
  }];
  var __infoObj = {}
  currentPlayer.init(__playList, 0, 0, true, __infoObj);
  currentPlayer.run();
},false);

document.getElementById('E_nextBtn').addEventListener('click',function(){
  event.preventDefault();
},false);
