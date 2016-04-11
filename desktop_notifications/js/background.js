var notificationId = '';

var opt = {
  type: 'basic',
  title: 'Desktop notification',
  message: 'Desktop notification Demo',
  iconUrl: 'images/icon48.png'
}

chrome.notifications.create('',opt,function(id){
  console.log('desktop_notifications notificationId:' + id);
  notificationId = id;
});

setTimeout(function(){
  chrome.notifications.clear(notificationId, function(){
    console.log('desktop_notifications clear:' + notificationId);
  })
},5000);
