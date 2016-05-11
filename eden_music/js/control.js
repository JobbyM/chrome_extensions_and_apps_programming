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
  -- currentPlayer.sectionPos;
  if(currentPlayer.sectionPos < 0){
    currnetPlayer.sectionPos = currentPlayer.sectionList.length - 1;
  }
  currentPlayer.run();
},false);

document.getElementById('E_playBtn').addEventListener('click',function(){
  event.preventDefault();
  currentPlayer = new EPlayer();
  var __playList = [{
    'actionURL' : 'data/Star Sky_Two Steps From Hell_Battlecry.mp3'
  }];
  currentPlayer.init(__playList, 0, 0);
  currentPlayer.run();
},false);

document.getElementById('E_nextBtn').addEventListener('click',function(){
  event.preventDefault();
  ++ currentPlayer.sectionPos;
  if(currentPlayer.sectionPos >= currentPlayer.sectionList.length){
    currnetPlayer.sectionPos = 0;
  }
  currentPlayer.run();
},false);
