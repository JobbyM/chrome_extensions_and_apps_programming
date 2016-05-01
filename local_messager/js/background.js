// 首先当应用运行时开始创建UDP 连接并加入到多播组
var udpSocket = new udp();
udpSocket.localPort = 8943;
udpSocket.receive = receiveMsg;
udpSocket.init(function(){
  udpSocket.joinGroup('224.0.1.100',function(){
    // Joined group 224.0.1.100
  });
});

// 下面需要background 来监听来自前端网页发来的指令
chrome.runtime.onMessage.addListener(function(message, sender, callback){
  if(message.action == 'send'){
    var buf = str2ab(message.msg);
    udpSocket.send('224.0.1.100', udpSocket.localPort, buf, function(){
      // message is sent
    });
  }
});

// 下面我们来编写接收信息的函数
function receiveMsg(info){
  var msg = ab2str(info.data);
  chrome.runtime.sendMessage({action: 'receive', msg: msg});
}

// 最后来编写ArrayBuffer 和String 类型数据互换的两个函数：
function str2ab(str){
  var buf = new ArrayBuffer(str.length*2);
  bufView = new Uint16Array(buf);
  for(var i = 0; i < str.length; i++){
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function ab2str(buf){
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

// 创建前端窗口
chrome.app.runtime.onLaunched.addListener(function(){
  chrome.app.window.create('main.html',{
    'id': 'main',
    'bounds':{
      'width': 400,
      'height': 600
    }
  });
});
