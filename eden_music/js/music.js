(function(){
  var Eden = window.Eden = {};
  Eden.player = function(){
    var playerCore = {};
    // 当前播放时间，总时长
    var currentTime = 0;
    var totalTime = 0;
    // 当前播放器状态，上一状态，状态检测定时器
    var currentstatus = -1;
    var prevstatus = -1;
    var backupstatus = -1;
    var statusTimer;
    // 当前缓冲进度，缓冲时间，进度检测定时器
    var bufferNumber = 0;
    var bufferTimeout = 0;
    var bufferTimer;
    // 媒体文件地址
    var mediaUrl = '';
    // 播放器对象
    var mediaObj = null;

    var status = playerCore.status = {
      stop: -1, // 停止
      ready: 0, // 准备
      play: 1, // 播放
      pause: 2, // 暂停
      buffer: 3, // 缓冲
      over: 4, // 结束
      exception: 5, // 异常
      error: 6 // 错误
    };

    var opt = {
      me: null,
      id: '', // 播放控件ID
      url: '', // 音频地址
      timeout: 0, // 超时时间
      beginTime: 0, // 开始播放时间
      onReady: '', // 参数处理结束回调函数
      onPlay: '', // 进入播放状态的回调函数
      onBuffer: '', // 进入缓冲状态的回调函数
      onPause: '', // 进入暂停状态的回调函数
      onResume: '', // 进入唤醒状态的回调函数
      onStop: '', // 音频播放停止后的回调函数
      onOver: '', // 音频播放结束后的回调函数
      onException: '', // 发生异常时的回调函数
      onError: '', // 发生错误时的回调函数
      onstatusChange: '' // 状态改变时的回调函数
    };

    // 移除页面上的所有的音乐播放器插件
    function removeAllMediaPlayer(){
      console.log('playerCore removeAllMediaPlayer start');
      var audios = [];
      audios = document.getElementsByTagName('audio');
      for(var i = 0; i < audios.length; i ++){
        audios[i].parentNode.removeChild(audios[i]);
      }
      console.log('playerCore removeAllMediaPlayer end');
    }

    // 创建一个新的播放器插件
    function createNewMediaPlayer(){
      console.log('playerCore createNewMediaPlayer start');
      var option = arguments && arguments[0];
      var objId = typeof opt.id == 'string' && (opt.id) ? opt.id : 'MPlayer';
      var parentArea = (opt && (typeof opt.id == 'string') && (opt.id) && $(opt.id)) ?
        document.getElementById(opt.id).parentNode : document.body;
      mediaObj = document.createElement('audio');
      parentArea.appendChild(mediaObj);
      console.log('playerCore createNewMediaPlayer end');
    }

    // 改变播放器状态
    function changestatus(s){
      console.log('playerCore changestatus start');
      currentstatus = s;
      console.log('playerCore:in changestatus,prevstatus -> ' + prevstatus);
      console.log('playerCore:in changestatus,currentstatus -> ' + currentstatus);
      if(prevstatus != s){
        currentstatus = prevstatus = s;
        if(opt.onStatusChange && typeof opt.onStatusChange == 'function'){
          opt.me ? opt.onStatusChange.call(opt.me) : opt.onStatusChange();
        }
        switch(s){
          case status.ready:
            if(opt.onReady && typeof opt.onReady == 'function'){
              opt.me ? opt.onReady.call(opt.me) : opt.onReady();
            }
            break;
          case status.stop:
            if(opt.onStop && typeof opt.onStop == 'function'){
              opt.me ? opt.onStop.call(opt.me) : opt.onStop();
            }
            break;
          case status.play:
            if(opt.onPlay && typeof opt.onPlay == 'function'){
              opt.me ? opt.onPlay.call(opt.me) : opt.onPlay();
            }
            break;
          case status.pause:
            if(opt.onPause && typeof opt.onPause == 'function'){
              opt.me ? opt.onPause.call(opt.me) : opt.onPause();
            }
            break;
          case status.buffer:
            if(opt.onBuffer && typeof opt.onBuffer == 'function'){
              opt.me ? opt.onBuffer.call(opt.me) : opt.onBuffer();
            }
            break;
          case status.over:
            if(opt.onOver && typeof opt.onOver == 'function'){
              opt.me ? opt.onOver.call(opt.me) : opt.onOver();
            }
            break;
          case status.exception:
            if(opt.onException && typeof opt.onException == 'function'){
              opt.me ? opt.onException.call(opt.me) : opt.onException();
            }
            break;
          case status.error:
            if(opt.onError && typeof opt.onError == 'function'){
              opt.me ? opt.onError.call(opt.me) : opt.onError();
            }
            break;
        }
      }
      console.log('playerCore changestatus end');
    }

    // 收到底层播放器onPlayReady 消息
    function onPlayReady(){
      console.log('playerCore onPlayReady start');
      isonReady = true;
      chanestatus(status.ready);
      console.log('playerCore onPlayReady end');
    }

    // 收到底层播放器onPlayForceStop 消息
    function onPlayForceStop(){
      console.log('playerCore onPlayForceStop start');
      if(isError){
        console.log('ignore exception on catch error');
        return;
      }
      clearTimer();
      if(isException){
        changestatus(status.exception);
      }else{
        changestatus(status.stop);
      }
      console.log('playerCore onPlayForceStop end');
    }

    // 收到底层播放器onPlayStop 消息
    function onPlayStop(){
      console.log('playerCore onPlayStop start');
      clearTimer();
      changestatus(status.over);
      console.log('playerCore onPlayStop end');
    }

    // 收到底层播放器onPlayError 消息
    function onPlayError(){
      console.log('playerCore onPlayError start');
      if(isException){
        console.log('ignore error on catch exception');
        return;
      }
      isError = true;
      clearTimer();
      changestatus(status.error);
      console.log('playerCore onPlayError end');
    }

    // 收到底层播放器onBufferingStart 消息
    function onBufferingStart(){
      console.log('playerCore onBufferingStart start');
      bufferNumber = mediaObj.getBufferingProgress();
      bufferTimeout = 0;
      if(bufferTimer){
        clearInterval(bufferTimer);
      }
      bufferTimer = setInterval(function(){
        bufferNumber = mediaObj.getBufferingProgress();
        console.log('playerCore onBufferingStart bufferNumber -> ' + bufferNumber);
        if(bufferNumber >= 100){
          bufferNumber = 100;
          clearTimer();
        }
        bufferTimeout++;
        if(bufferTimeout > opt.timeout * 10){
          isException = true;
          playerCore.stop();
        }
      }, 100);
      changestatus(status.buffer);
      console.log('playerCore onBufferingStart end');
    }

    // 收到底层播放器onBufferingComplete 消息
    function onBufferingComplete(){
      console.log('playerCore onBufferingComplete start');
      bufferTimeout = 0;
      bufferNumber = 0;
      clearTimer();
      if(isonReady){
        if(backupstatus == status.pause){
          changestatus(status.pause);
        }else{
          changestatus(status.play);
        }
      }
      console.log('playerCore onBufferingComplete end');
    }

    function clearTimer(){
      console.log('playerCore clearTimer start');
      if(bufferTimer){
        clearInterval(bufferTimer);
      }
      console.log('playerCore clearTimer end');
    }

    playerCore.init = function(){
      prevstatus = currentstatus = status.init;
      backupstatus =status.init;
      currentTime = totalTime = 0;
    }

    playerCore.ready = function(){
      console.log('playerCore ready start');
      var options = (arguments && arguments[0]) || {};
      prevstatus = currentstatus = status.stop;
      currentTime = totalTime = 0;
      changestatus(status.stop);

      opt.me = options.me || null;
      // handle timeout
      opt.timeout = typeof (options.timout = parseInt(options.timeout)) == 'number'?
        options.timeout : 60;
      // handle beginTime
      opt.beginTime = typeof (options.beginTime = parseInt(options.beginTime)) == 'number'?
        options.beginTime : 0;
      // handle event callback
      opt.onReady = typeof options.onReady == 'function'? options.onReady : '';
      opt.onPlay = typeof options.onPlay == 'function'? options.onPlay : '';
      opt.onBuffer = typeof options.onBuffer == 'function'? options.onBuffer : '';
      opt.onPause = typeof options.onPause == 'function'? options.onPause : '';
      opt.onResume = typeof options.onResume == 'function'? options.onResume : '';
      opt.onStop = typeof options.onStop == 'function'? options.onStop : '';
      opt.onOver = typeof options.onOver == 'function'? options.onOver : '';
      opt.onException = typeof options.onException == 'function'? options.onException : '';
      opt.onError = typeof options.onError == 'function'? options.onError : '';
      opt.onStatusChange = typeof options.onStatusChange == 'function'? options.onStatusChange : '';

      // handle options.url , set mediaUrl
      if(options.url && typeof options.url == 'string'){
        mediaUrl = options.url;
        opt.url = options.url;
      }else{
        console.log('playerCore:url err');
        changestatus(status.exception);
        return false;
      }

      if(mediaObj.play){
        mediaObj.play(opt.url, opt.beginTime);
      }

      console.log('playCore ready end');
      return true;
    }

    playerCore.pause = function(){
      console.log('playerCore pause start');
      if(typeof mediaObj.pause == 'function' && currentstatus > status.stop){
        mediaObj.pause();
        changestatus(status.pause);
        backupstatus = status.pause;
        console.log('playerCore pause end');
        return true;
      }else{
        return false;
      }
    }

    playerCore.resume = function(){
      console.log('playerCore resume start');
      if(typeof mediaObj.resume == 'function' && currentstatus == status.pause){
        mediaObj.resume();
        changestatus(status.play);
        backupstatus = status.play;
        console.log('playerCore resume end');
        return true;
      }else{
        return false;
      }
    }

    playerCore.stop = function(){
      console.log('playerCore stop start');
      if(mediaObj && typeof mediaObj.stop == 'function'){
        mediaObj.onPlayError = function(){
          console.log('ignore error after stop');
        }
        mediaObj.stop();
        currentTime = 0;
        console.log('playerCore stop end');
        return true;
      }else{
        return false;
      }
    }

    playerCore.seekByTime = function(seekTime){
      console.log('playerCore seekTime start seekTime:' + seekTime);
      if(typeof mediaObj.seekByTime == 'function'){
        seekTime = parseInt(seekTime, 10);
        var seekResult = mediaObj.seekByTime(seekTime);
        console.log('playerCore:seek result is :' + seekResult);
        currentTime = mediaObj.getCurrentTime();
        console.log('playerCore seekByTime end');
        return true;
      }else{
        return false;
      }
    }

    playerCore.getStatus = function(){
      return currentstatus;
    }

    playerCore.getCurrentTime = function(){
      currentTime = mediaObj.getCurrentTime();
      return currentTime ? currentTime : 0;
    }

    playerCore.getBufferNum = function(){
      return bufferNumber;
    }

    playerCore.getOpt = function(){
      return opt;
    }
  }();
})();

function BasePlayer(){
  this.playingTimerCount = 0;
  this.playingTimer = null;
  this.playSuccessFlag = false;
  this.bufferingTimer = null;
  this.playDelayTimer = null;
  this.playingStatus = Eden.player.status.stop;
  this.currentTime = 0;
  this.totalTime = 0;
  this.bufferNum = 0;
  this.timeout = 90;
  this.sectionList = [];
  this.sectionPos = 0;
  this.keepState = false;
  this.speed = 0;
  this.bufferSum = 0;
  this.listenTimer = null;
  this.logTimer = null;
  this.listenStep = 60000;
  this.showChange = false;
  this.ui_dom_info = $('player_top_info');
  this.ui_dom_processCurrentTime = $('player_currentTime');
  this.ui_dom_progressBody = $('player_progressBody');
  this.ui_dom_progressFlag = $('player_progressFlag');

  this.ui_flg_seeking = false;
  this.ui_int_playingTime = 0;
  this.ui_int_totalTime = 0;
  this.ui_int_focusArea = 0;
}

BasePlayer.prototype = {
  doinit : function(){
    Eden.player.init();
    this.playSuccessFlag = false;
    this.totalTime = 0;
    this.bufferNum = 0;
    this.sectionPos = 0;
  },

  doPlay : function(__url, __breakpoint){
    var me = this;
    this.playSuccessFlag = false;
    this.currentTime = __breakpoint || 0;
    this.totalTime = 0;
    this.bufferNum = 0;
    this.bufferSum = 0;
    if(typeof this.onBuffer == "function"){
      this.onBuffer();
    }
    if(typeof this.onBuffering == "function"){
      this.onBuffering(this.bufferNum);
    }
    this.sectionPos = 0;
    this.sectionList = this._translateActionURL(__url);
    this.playDelayTimer = window.setTimeout(function(){
      Eden.player.ready({
        me: me,
        id: '',// 播放器控件ID
        url: me.sectionList[me.sectionPos], // 资源地址
        timeout: me.timeout, // 超时时间
        beginTime: __breakpoint, // 开始播放时间
        onReady: me.catchReady, // 进入准备状态的回调函数
        onPlay: me.catchPlay, // 进入播放状态的回到函数
        onBuffer: me.catchBuffer, // 进入缓冲状态时的回调函数
        onPause: me.catchPause, // 进入暂停状态的回调函数
        onStop: me.catchStop, // 手动停止的回调函数
        onOver: me.catchOver, // 播放结束时的回调函数
        onException: me.catchException, // 发送异常时的回调函数
        onError: me.onError, // 发生错误时的回调函数
        onStatusChange: me.catchStatusChange // 状态改变时的回调函数
      });
    }, 200);
  },

  doPause : function(){
    if(this.playSuccessFlag == false){
      return;
    }
    return Eden.player.pause();
  },

  doResume : function(){
    if(this.playSuccessFlag == false){
      return;
    }
    return Eden.player.resume();
  },

  doSeek : function(){
    if(this.playSuccessFlag == false){
      return;
    }
    if(this.getCurrentTime()>60 && this.showChange==true){
      this.bufferSum --;
    }else if(this.getCurrentTime()<60){
      this.bufferSum = 0;
    }
    this.currentTime = Math.floor(__sec);
    this.uiDisplayBuffer(true);
    return Eden.player.seekByTime(this.currentTime);
  },

  doStop : function(){
    window.clearInterval(this.playingTimer);
    window.clearInterval(this.bufferingTimer);
    window.clearTimeout(this.playDelayTimer);
    window.clearInterval(this.listenTimer);
    window.clearInterval(this.logTimer);
    return Eden.player.stop();
  },

  getCurrentTime : function(){
    this.currentTime = Eden.player.getCurrentTime();
    return this.currentTime;
  },

  getTotalTime : function(){
    return this.totalTime ? this.totalTime : Eden.player.getTotalTime();
  },

  _translateActionURL : function(__url){
    var tmpPlayList = (__url && typeof __url == 'string') ? __url.split('&') : [];
    return tmpPlayList;
  },

  catchReady : function(){
    playVideoIsOver = false;
    var me = this;
    this.playSuccessFlag = true;
    this.totalTime = Eden.player.getTotalTime();
    if(typeof this.onReady == 'function'){
      this.onReady();
    }
    window.clearInterval(this.playingTimer);
    this.playingTimer = window.setInterval(function(){
      me.playingTimerCount = 0;
      me.playing();
    }, 1000);

    window.clearInterval(this.bufferingTimer);
    this.bufferingTimer = window.setInterval(function(){
      if(typeof me.onBuffering == 'function'){
        var tmpBufferingNum = Eden.player.getBufferNum();
        if(tmpBufferingNum > me.bufferNum){
          me.bufferNum = tmpBufferingNum;
          me.onBuffering(me.bufferNum);
        }
      }
    }, 200);
  },

  catchPlay : function(){
    this.ui_flg_seeking = false;
    var me = this;
    if(me.buferNum > 0){
      me.bufferNum = 100;
      if(typeof me.onBuffering == 'function'){
        me.onBuffering(me.bufferNum);
      }
      window.setTimeout(function(){
        if(me.playingStatus == Eden.player.status.play){
          window.clearInterval(me.bufferingTimer);
          me.bufferNum = 0;
          if(typeof me.onBuffering == 'function'){
            me.onBuffering(me.bufferNum);
          }
          if(typeof me.onPlay == 'function'){
            me.onPlay();
          }
        }
      }, 1000);
    }else if(typeof me.onPlay == 'function'){
      me.onPlay();
    }
  },

  catchBuffer : function(){
    if(this.getCurrentTime()>60 && this.showChange == true){
      this.bufferSum ++;
    }else if(this.getCurrentTime()<60){
      this.bufferSum = 0;
    }

    var me = this;
    window.setTimeout(function(){
      if(me.playingStatus == Eden.player.status.buffer){
        if(typeof me.onBuffer == 'function'){
          me.onBuffer();
        }
        window.clearInterval(me.bufferingTimer);
        me.bufferingTimer = window.setInterval(function(){
          if(typeof me.onBuffering == 'function'){
            var tmpBufferingNum = Eden.player.getbufferNum();
            if(tmpBufferingNum > me.bufferNum){
              me.bufferNum = tmpBufferingNum;
              me.onBuffering(me.bufferNum);
            }
          }
        }, 100);
      }
    }, 1000);
  },

  catchPause : function(){
    if(typeof this.onPause == 'function'){
      this.onPause();
    }
  },

  catchStop : function(){
    window.clearInterval(this.playingTimer);
    window.clearInterval(this.bufferingTimer);
    if(typeof this.onStop == 'function'){
      this.onStop();
    }
  },

  catchOver : function(){
    playVideoIsOver = true;
    window.clearInterval(this.playingTimer);
    window.clearInterval(this.bufferingTimer);
    if(typeof this.onPlaying == 'function'){
      this.onPlaying(this.totalTime);
    }
    if(this.sectionPos < this.sectionList.length - 1){
      var me = this;
      this.playingSuccessFlag = false;
      this.currentTime = 0;
      this.totalTime = 0;
      this.bufferNum = 0;
      if(typeof this.onBuffer == 'function'){
        this.onBuffer();
      }
      if(typeof this.onBuffering == 'function'){
        this.onBuffering(this.bufferNum);
      }

      this.playDelayTimer = window.setTimeout(function(){
        Eden.player.ready({
          me: me,
          id: '',// 播放器控件ID
          url: me.sectionList[me.sectionPos], // 资源地址
          timeout: me.timeout, // 超时时间
          beginTime: __breakpoint, // 开始播放时间
          onReady: me.catchReady, // 进入准备状态的回调函数
          onPlay: me.catchPlay, // 进入播放状态的回到函数
          onBuffer: me.catchBuffer, // 进入缓冲状态时的回调函数
          onPause: me.catchPause, // 进入暂停状态的回调函数
          onStop: me.catchStop, // 手动停止的回调函数
          onOver: me.catchOver, // 播放结束时的回调函数
          onException: me.catchException, // 发送异常时的回调函数
          onError: me.onError, // 发生错误时的回调函数
          onStatusChange: me.catchStatusChange // 状态改变时的回调函数
        });
      }, 100);
    }else if(typeof this.onOver == 'function'){
      this.onOver();
    }
  },

  catchException : function(){
    window.clearInterval(this.playDelayTimer);
    window.clearInterval(this.playingTimer);
    window.clearInterval(this.bufferingTimer);
    if(typeof this.onException == 'function'){
      this.onException();
    }
  },

  catchError : function(){
    window.clearInterval(this.playDelayTimer);
    window.clearInterval(this.playingTimer);
    window.clearInterval(this.bufferingTimer);
    if(typeof this.onError == 'function'){
      this.onError();
    }
  },

  catchStatusChange : function(){
    this.playingStatus = Eden.player.getStatus();
  },

  playing : function(){
    if(this.playingStatus == Eden.palyer.status.play && this.ui_flg_seeking == false){
      this.playingTimerCount ++;
      var tmpCurrentTime = Eden.player.getCurrentTime();
      this.currentTime = tmpCurrentTime;
      if(typeof this.onPlaying == 'function'){
        if(!this.totalTime || this.currentTime > this.tottalTime){
          this.onPlaying(this.totalTime);
        }else{
          this.onPlaying(this.currentTime);
        }
      }
      if(!!!this.totalTime && this.playingTimerCount < 4){
        this.totalTime = Eden.player.getTotalTime();
        if((this.totalTime || this.playingTimerCount == 3)
          && typeof this.onStart == 'function'){
          this.onStart(this.totalTime);
          if(typeof this.onPlay == 'function'){
            this.onPlay();
          }
        }
      }
    }
  },

  uiInit : function(){
    // 初始化
    console.log('uiInit');
  },

  uiDestory : function(){
    // 销毁
    console.log('uiDestory');
  },

  uiSetInfoText : function(__str){
    this.ui_str_info = __str;
  },

  onReady : function(){
    this.uiSetToatalTime(this.totalTime);
  },

  onStart : function(){
    this.uiDisplayProgressAndInfo(true)
  },

  onPlay : function(){
    this.uiDisplayPause(false);
    this.ui_flg_seeking = false;
    this.uiDisplayBuffer(false);
  },

  onPause : function(){
    this.uiDisplayPause(true);
  },

  onBuffer : function(){
    this.uiDisplayBuffer(true);
  },

  onPlaying : function(__currentTime){
    this.uiSetCurrentTime(__currentTime);
  },

  onStop : function(){
    shit.uiDisplayBuffer(false);
  },

  onOver : function(){

  },

  onException : function(){

  },

  onError : function(){

  },

  onKeyDown : function(__keyCode){

  },

  _translateTopInfo : function(){
      var infoStr = '';
      if(this.infoObj && this.infoObj.type && this.playList && typeof this.playPos == 'number'){
        if(this.infoObj.type){
          if(this.playList.length == 1){
            infoStr = this.infoObj.name || '';
          }else{
            infoStr = this.playList[this.playPos].name;
          }
          infoStr = (this.infoObj.zone && infoStr) ? '[' + this.infoObj.zone + ']' + infoStr : infoStr;
        }
      }
      return infoStr;

  },

  init : function(__playList, __playPos, __breakpoint, __isLoop, __infoObj, __restartArgs){
    var me = this;
    this.infoObj = __infoObj;

    if(__playList && __playList instanceof Array){
      this.playList = __playList;
    }

    this.playPos = __playPos || 0;
    this.breakpoint = __breakpoint || 0;
    this.isLoop = __isLoop == true ? true : false;
    this.restartArgs = __restartArgs;
  },

  run : function(){
      if(this.infoObj && this.playList.length > 0){
        this.uiInit();
        this.uiSetInfoText(this._translateTopInfo());
        this.doPlay(this.playList[this.playPos].actionURL, this.breakpoint)
      }
  },

  stop : function(){
    this.doStop();
  },

  destroy : function(){
    this.playList = [];
    this.playPos = 0;
    this.isLoop = false;
    this.breakpoint = 0;
    this.uiDestory();
  }

}
