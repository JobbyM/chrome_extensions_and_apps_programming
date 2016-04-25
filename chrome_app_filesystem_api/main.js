document.getElementById('openfile').addEventListener('click',function(){
  chrome.fileSystem.chooseEntry({type: 'openFile'},function(fileEntry){
    console.log(fileEntry)
    //We'll do something with fileEntry later
    fileEntry.file(function(file){
      //We'll do something with file later
      var reader = new FileReader();
      reader.onload = function(){
        var text = this.result;
        console.log(text);
        //do something with text
      }
      reader.readAsText(file);
    });
  });
},false);
document.getElementById('opendirectory').addEventListener('click',function(){
  chrome.fileSystem.chooseEntry({type: 'openDirectory'},function(Entry){
    console.log(Entry);
    //We'll do something with Entry later
  });
},false);
document.getElementById('myFile').addEventListener('change',function(){
  var file = this.files[0];
  console.log(file);
},false);
