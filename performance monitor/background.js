chrome.app.runtime.onLaunched.addListener(function(){
  var main_window = chrome.app.window.get('main');
  if(main_window){
    main_window.show();
  }else{
    chrome.app.window.create('main.html',{
      'id': 'main',
      'innerBounds': {
        'width': 542,
        'height': 360
      },
      'resizable': false,
      'frame':'none'
    });
  }
});

chrome.app.window.onFullscreened.addListener(function(){
  // do something when the window is set to fullsreeen;
});

chrome.app.window.onMaximized.addListener(function(){
  // do something when the window is set to maximized;
});

chrome.app.window.onMinimized.addListener(function(){
  // do something when the window is set to minimized;
});

chrome.app.window.onResotored.addListener(function(){
  // do something when the window is set to restored;
});

chrome.app.window.onBoundsChanged.addListener(function(){
  // do something when the window is set to resized;
});

chrome.app.window.onClosed.addListener(function(){
  // do something when the window is set to closed;
});
