chrome.app.runtime.onLaunched.addListener(function(){
  var main_window = chrome.app.window.get('main');
  if(main_window){
    main_window.show();
  }else{
    chrome.app.window.create('main.html',{
      'id': 'main',
      'bounds':{
        'width': 800,
        'height': 600
      }
    });
  }
});
