document.getElementById('createFile').addEventListener('click',function(){
  chrome.fileSystem.chooseEntry({type: 'openDirectory'},function(Entry){
    Entry.getDirectory('new_folder',{create: true},function(subEntry){
      // We'll do something with subEntry later
    },errorHandler);
  });
},false);
