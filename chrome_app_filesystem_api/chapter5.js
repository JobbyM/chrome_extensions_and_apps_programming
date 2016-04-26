document.getElementById('createFile').addEventListener('click',function(){
  // chrome.fileSystem.chooseEntry({type: 'openDirectory'},function(Entry){
  //   // Entry.getDirectory('new_folder',{create: true},function(subEntry){
  //   //   // We'll do something with subEntry later
  //   // },errorHandler);
  //   Entry.getFile('log.txt', {create: true}, function(fileEntry){
  //     // We'll do someting with fileEntry
  //   },errorHandler);
  // });
  chrome.fileSystem.chooseEntry({
    type: 'saveFile',
    suggestedName: 'log.txt'
  }, function(fileEntry){
    // We'll do something with fileEntry later
  });
},false);
