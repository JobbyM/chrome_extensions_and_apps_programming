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

document.getElementById('getVoices').addEventListener('click',function(){
  chrome.tts.getVoices(function(voices){
    // do something with voices
    console.log(voices);
    var utterance = "";
    for (var i = 0; i < voices.length; i++) {
      voices[i].voiceName;
      voices[i].lang;
      switch(voices[i].lang){
        case 'zh-CN':
          utterance = "你好，世界！";
          break;
        case 'zh-HK':
          utterance = "你好，世界！";
          break;
        case 'zh-TW':
          utterance = "你好，世界！";
          break;
        case 'en-US':
          utterance = "Hello, world!";
          break;
        default:
          utterance = "Hello, world!";
      }

      chrome.tts.speak(utterance,{
        voiceName: voices[i].voiceName,
        lang: voices[i].lang,
        enqueue: true,
        onEvent: function(event){
          console.log('Event ' + event.type + ' at position' + event.charIndex);
          if(event.type == 'error'){
            console.log('Error: ' + event.errorMessage);
          }
        }
      },function(){
        if(chrome.runtime.lastError){
          console.log('Error: ' + chrome.runtime.lastError.message);
        }
      });
    }
  });
},false);

document.getElementById('song').addEventListener('click',function(){
  var starsky = ['Star Sky - Two Steps From Hell',
  'Here we are',
  'Riding the sky',
  'Painting the night with sun',
  'You and I Mirrors of light',
  'Twin flames of fire',
  'Lit in another time and place',
  'I knew your name',
  'I knew your face',
  'Your love and grace',
  'Past and present now embrace',
  'Worlds collide in inner space',
  'Unstoppable the song we play',
  'Burn the page for me',
  'I cannot erase the time of sleep',
  'I cannot be loved so set me free',
  'I cannot deliver your love',
  'Or caress your soul so',
  'turn that page for me',
  'I cannot embrace the touch that you give',
  'I cannot find solace in your words',
  'I cannot deliver you your love',
  'or caress your soul',
  'Age to age',
  'I feel the call',
  'Memory of future dreams',
  'You and I riding the sky',
  'Keeping the fire bright',
  'From another time and place',
  'I know your name',
  'I know your face',
  'Your touch and grace',
  'All of time can not erase',
  'What our hearts remember stays',
  'Forever on a song we play',
  'Burn the page for me',
  'I cannot erase the time of sleep',
  'I cannot be loved so set me free',
  'I cannot deliver your love',
  'Or caress your soul so',
  'turn that page for me',
  'I cannot embrace the touch that you give',
  'I cannot find solace in your words',
  'I cannot deliver you your love',
  'or caress your soul'];
  console.log(starsky);
  chrome.tts.getVoices(function(voices){
    console.log(voices);
    var vl = voices.length;
    var random = 0;
    var utterance = '';
    var voiceName = 'Google 日本語';
    var lang = 'ja-JP';
    for(var i = 0, len = starsky.length; i < len; i ++){

      random = Math.floor(Math.random()*vl);
      if(!random){
        random = 1;
      }
      utterance = starsky[i];
      voiceName = voices[random].voiceName;
      lang = voices[random].lang;
      console.log('utterance:' + utterance);
      console.log('random:' + random);
      console.log('voiceName:' + voiceName);
      console.log('lang:' + lang);
      chrome.tts.speak(utterance,{
        'voiceName': voiceName,
        'lang': lang,
        'enqueue': true,
        'onEvent': function(event){
          console.log('Event ' + event.type + ' at position' + event.charIndex);
          if(event.type == 'error'){
            console.log('Error: ' + event.errorMessage);
          }
        }
      },function(){
        if(chrome.runtime.lastError){
          console.log('Error: ' + chrome.runtime.lastError.message);
        }
      });
    }
  });
},false);
