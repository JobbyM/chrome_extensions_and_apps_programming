function tcpServer(){
  var _tcpServer = chrome.sockets.tcpServer;
  this.option = {},
  this.socketId = 0,

  this.create = function(callback){
    _tcpServer.create(this.option, function(socketInfo){
      this.socketId = socketInfo.socketId;
      callback();
    }.bind(this));
  }.bind(this),

  this.update = function(){
    _tcpSever.update(this.socketId, newSocektOption, callback);
  }.bind(this),

  this.pause = function(isPaused, callback){
    _tcpServer.setPaused(this.socketId, isPaused, callback);
  }.bind(this),

  this.disconnect = function(callback){
    _tcpServer.disconnect(this.socketId, callback);
  }.bind(this),

  this.close = function(callback){
    _tcpServer.close(this.socketId, callback);
  }.bind(this),

  this.init = function(callback){
    this.create(callback);
  }.bind(this)
}
