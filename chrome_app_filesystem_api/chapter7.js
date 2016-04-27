document.getElementById('fileWriter').addEventListener('click',function(){
  // chrome.fileSystem.chooseEntry({type: 'openDirectory'},function(Entry){
  //   Entry.getFile('log.txt',{},function(fileEntry){
  //     fileEntry.createWriter(function(fileWriter){
  //       // We'll do something with fileWriter later
  //
  //     },errorHandler);
  //   },errorHandler);
  // });
  chrome.fileSystem.chooseEntry({
    type: 'saveFile',
    suggestedName: 'log.txt'
  },function(fileEntry){
    fileEntry.createWriter(function(fileWriter){
      // We'll do something with fileWriter later
      fileWriter.write(new Blob(['Hello World'], {type: 'text/plain'}));

      fileWriter.onwrite = function(){
        console.log('Write begin.');
      }

      fileWriter.onwriteend = function(){
        console.log('Write end.');
      }
    },errorHandler);
  });
},false);
