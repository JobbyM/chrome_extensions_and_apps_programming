document.getElementById('fileWriter').addEventListener('click',function(){
  chrome.fileSystem.chooseEntry({type: 'openDirectory'},function(Entry){
    Entry.getFile('log.txt',{},function(fileEntry){
      fileEntry.createWriter(function(fileWriter){
        // We'll do something with fileWriter later
      },errorHandler);
    },errorHandler);
  });
  chrome.fileSystem.chooseEntry({
    type: 'saveFile',
    suggestedName: 'log.txt'
  },function(fileEntry){
    fileEntry.createWriter(function(fileWriter){
      // We'll do something with fileWriter later
    },errorHandler);
  });
},false);
