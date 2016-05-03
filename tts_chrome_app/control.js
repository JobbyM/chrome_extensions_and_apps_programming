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

document.getElementById('speak').addEventListener('click',function(){
  chrome.tts.speak('Hello, world.');
  chrome.tts.speak('Speak this next, when the first sentence is done.',{enqueue: true});
  // chrome.tts.speak(utterance, options, function(){
  //   if(chrome.runtime.lastError){
  //     console.log('Error: ' + chrome.runtime.lastError.message);
  //   }
  // });
},false);

document.getElementById('stop').addEventListener('click',function(){
  chrome.tts.stop();
},false);

document.getElementById('pause').addEventListener('click',function(){
  chrome.tts.pause();
},false);

document.getElementById('resume').addEventListener('click',function(){
  chrome.tts.resume();
},false);
