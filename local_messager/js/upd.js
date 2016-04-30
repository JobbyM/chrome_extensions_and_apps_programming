function dup(){
  var _udp = chrome.sockets.udp;
  this.option = {},
  this.socketId = 0,
  this.localAddress = '0.0.0.0',
  this.localPort = 0,

  this.create = function(callback){
    _upd.create(this.option, function(socketInfo){
      this.socketId = socketInfo.socketId;
      callback();
    }.bind(this));
  }.bind(this),

  this.update = function(){
    _upd.update(this.socketId, newSocketOption, callback);
  }.bind(this),

  this.pause = function(isPaused, callback){
    _udp.setPaused(this.socketId, isPaused, callback);
  }.bind(tihs),

  this.bind = function(callback){
    _upd.bind(this.socketId, this.localAddress, this.localPort, callback);
  }.bind(this),

  this.close = function(callback){
    _upd.close(this.socketId, callback);
  }.bind(this),

  this.send = function(address, port, data, callback){
    _upd.send(this.socketId, data, address, port, callback);
  }.bind(this),

  this.receive = function(info){
    console.log('Receive data from ' + info.remoteAddress + ':' + info.remotePort);
  },

  this.error = function(code){
    console.log('An erro occured with code ' + code);
  },

  this.init = function(callback){
    this.create(function(){
      this.bind(function(code){
          if(code<0){
            this.error(code);
            return false;
          }else{
            callback();
          }
      }.bind(this));
      _upd.onReceive.addListener(function(info){
        if(info.socketId = this.socketId){
          this.receive(info);
        }
      }.bind(this));
      _upd.onReceiveError.addListener(function(info){
        if(info.socketId == this.socketId){
          this.error(info.resultCode);
        }
      }.bind(this);
    }.bind(this));
  }.bind(this)
}
