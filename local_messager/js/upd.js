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

  this.init = function(callback){
    this.create(function(){
      this.bind(callback);
    }.bind(this));
  }.bind(this)
}
