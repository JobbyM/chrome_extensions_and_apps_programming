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
      over: 4 // 结束
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
      opt.timeout = typeof options.timout = parseInt(options.timeout) == 'number'?
        options.timeout : 60;
      // handle beginTime
      opt.beginTime = typeof options.beginTime = parseInt(options.beginTime) == 'number'?
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
