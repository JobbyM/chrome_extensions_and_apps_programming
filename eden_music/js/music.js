function EPlayer(){
  this.sectionList = [];  // 播放列表 {['actionURL': 'data/1.mp3']}
  this.sectionPos = 0;    // 播放列表中第几个
  this.isLoop = false;      // 是否循环
  this.totalTime = 0;     // 总时间
  this.currentTime = 0;   // 当前时间
}

EPlayer.prototype = {
  doinit : function(){
    Eden.player.init();
  },
  doPlay : function(__url, __breakpoint){
    var me = this;
    this.sectionList = this._translateActionURL(__url);
    this.currentTime = __breakpoint || 0;
    this.playDelayTimer = window.setTimeout(function(){
      Eden.player.ready({
        me : me,
        id : "",
        url : me.sectionList[me.sectionPos], //视频地址
        beginTime : __breakpoint, //开始播放时间
      });
    },200);
  },
  //私有方法，翻译url
  _translateActionURL : function(__url){
    console.log("player.js _translateActionURL __url :" + __url);
    var tmpPlayList =(__url && typeof __url == 'string') ? [__url] : __url;
    return tmpPlayList;
  },
  doPause : function(){
    return Eden.player.pause();
  },
  doResume : function(){
    return Eden.player.resume();
  },
  doStop : function(){
    return Eden.player.stop();
  },
  init : function(__sectionList, __sectionPos, __isLoop){
    var me = this;
    if(__sectionList && __sectionList instanceof Array == true){
      this.sectionList = __sectionList;
    }
    this.sectionPos = __sectionPos || 0;
    this.isLoop = __isLoop == true ? true : false;
  },
  run : function(__actionURL, __breakpoint){
    this.currentTime = __breakpoint || 0;
    this.doPlay(this.sectionList[this.sectionPos].actionURL, this.currentTime);
  },
  stop : function(){
    this.doStop();
  },
  destory : function(){
    this.sectionList = [];
    this.sectionPos = 0;
    this.isLoop = false;
    this.breakpoint = 0;
  }
}

var Eden = window.Eden = {};
Eden.player = function(){
  var playerCore = {};
  var loop = false;      // 是否循环
  var totalTime = 0;     // 总时间
  var currentTime = 0;   // 当前时间
  var mediaUrl = '';     // 播放地址
  var mediaObj = null;   // 播放器对象

  var opt = {
    me : null,
    id : "", //播放控件ID
    url : "", //视频地址
    timeout : 0, //超时时间
    beginTime : 0, //开始播放时间
    onReady : "", //参数处理结束回调函数
    onPlay : "", //进入播放状态的回调函数
    onBuffer : "", //进入缓冲状态时的回调函数
    onPause : "", //进入暂停状态的回调函数
    onResume : "", //进入唤醒状态的回调函数
    onStop : "", //视频播被停止后的回调函数
    onOver : "", //视频播放结束后的回调函数
    onException : "", //发生异常时的回调函数
    onError : "", //发生错误时的回调函数
    onstatusChange : ""	//状态改变时的回调函数
  };

  // 创建一个新的播放器插件
  function createNewMediaPlayer(){
    console.log('createNewMediaPlayer start');
    var option = arguments && arguments[0];
    var objId = typeof opt.id == 'string' && (opt.id) ? opt.id : 'TVPlayer';
    var parentArea = (opt && ( typeof opt.id == "string") && (opt.id) && $(opt.id)) ? $(opt.id).parentNode : document.body;
    mediaObj = document.createElement("audio");
    mediaObj.setAttribute("id", objId);
    parentArea.appendChild(mediaObj);
    console.log('createNewMediaPlayer end');
  }

  // 移除页面上的所有播放器插件
  function removeAllMediaPlayer(){
    console.log('removeAllMediaPlayer start');
    var target = [];
    var audios = [];
    var i;
    audios = document.getElementsByTagName("audio");
    for( i = 0; i < audios.length; i++) {
      target.push(embeds[i]);
    };
    for( i = 0; i < target.length; i++) {
      target[i].parentNode.removeChild(target[i]);
    };
    console.log('removeAllMediaPlayer end');
  }

  function onPlayReady(){

  }

  playerCore.init = function(){
    var loop = false;      // 是否循环
    var totalTime = 0;     // 总时间
    var currentTime = 0;   // 当前时间
  }

  playerCore.ready = function(){
    console.log('playerCore ready');
    var options = (arguments && arguments[0]) || {};
    currentTime = totalTime = 0;
    opt.me = options.me || null;
    if( typeof options.id == 'string' && (options.id)){
      mediaObj = document.getElementById(options.id);
      if(!mediaObj) {
        opt.id = options.id;
        removeAllMediaPlayer();
        createNewMediaPlayer();
      }
    }else{//no id,so remove old and create a new audio
      if(!mediaObj){
        removeAllMediaPlayer();
        createNewMediaPlayer();
      }
    }

    mediaObj.addEventListener('loadeddata',onPlayReady)

    mediaObj.addEventListener('abort',playerCore.stop);
    // mediaObj.addEventListener('play',)
    mediaObj.addEventListener('pause',playerCore.pause);

    //handle options.url,set mediaUrl;
    if(options.url && typeof options.url == 'string') {
      mediaUrl = options.url;
      opt.url = options.url;
    } else {
      console.log('playerCore:url err');
      return false;
    }
    //handle beginTime
    opt.beginTime = typeof (options.beginTime = parseInt(options.beginTime)) == 'number' ? options.beginTime : 0;
    mediaObj.src = opt.url;
    mediaObj.currentTime = opt.beginTime;
    mediaObj.play();
  }

  playerCore.pause = function(){
    console.log('playerCore pause');
    if(!mediaObj.paused){
      mediaObj.pause();
    }
  }

  playerCore.resume = function(){
    console.log('playerCore resume');
    if(mediaObj.paused){
      mediaObj.paused = false;
    }
  }

  playerCore.stop = function(){
    console.log('playerCore stop');
    if(mediaObj){
      mediaObj.src = null;
      removeAllMediaPlayer();
    }
  }

  playerCore.getTotalTime = function(){
    console.log('playerCore getTotalTime');
    return totalTime = mediaObj.duration || 0;
  }

  playerCore.getCurentTime = function(){
    console.log('playerCore getCurrentTime');
    return currentTime = mediaObj.currenttime || 0;
  }
  return playerCore;
}();
