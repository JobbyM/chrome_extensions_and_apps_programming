var imgFormats = ['png', 'bmp', 'jpeg', 'jpg', 'gif', 'png', 'svg', 'xbm', 'webp'];
var audFormats = ['wav', 'mp3'];
var vidFormats = ['3gp', '3gpp', 'avi', 'flv', 'mov', 'mpeg', 'mpeg4', 'mp4', 'ogg', 'webm', 'wmv'];
var searching = false;
var scanning = false;

document.getElementById('edit').addEventListener('click',function(){
  document.getElementById('container').innerHTML = '';
  chrome.mediaGalleries.getMediaFileSystems({
    interactive: 'yes'
  },listMediaGalleries);
},false);

document.getElementById('scan').addEventListener('click',function(){
  scanning ?
    chrome.mediaGalleries.startMediaScan && chrome.mediaGalleries.startMediaScan():
    chrome.mediaGalleries.cancelMediaScan && chrome.mediaGalleries.cancelMediaScan();
},false);

document.getElementById('error').addEventListener('click',function(){
  this.style.dislay = 'none';
},false);

document.getElementById('home').addEventListener('click', function(){
  searching = false;
  document.getElementById('subpath').innerHTML = '';
  getMedia();
},false);

chrome.mediaGalleries.onScanProgress && chrome.mediaGalleries.onScanProgress.addListener(function(details){
  switch(details.type){
    case 'start':
      scanning = true;
      document.getElementById('loading').style.display = 'block';
      break;
    case 'cancel':
      scanning = false;
      document.getElementById('loading').style.display = 'none';
      break;
    case 'finish':
      scanning = false;
      document.getElementById('loading').style.display = 'none';
      chrome.mediaGalleries.addScanResults(listMediaGalleries);
      break;
    case 'error':
      scanning = false;
      document.getElementById('loading').style.display = 'none';
      document.getElementById('error').style.display = 'block';
      break;
  }
});

function getMedia(){
  chrome.mediaGalleries.getMediaFileSystems({
    interactive: 'if_needed'
  }, listMediaGalleries);
}

function listMediaGalleries(fileSystemArray){
  document.getElementById('container').innerHTML = '';
  for(var i = 0 ; i < fileSystemArray.length; i ++){
    (function(i, fs){
      var info = chrome.mediaGalleries.getMediaFileSystemMetadata(fs);
      console.log(info);
      var item = document.createElement('span');
      item.className = 'item';
      item.title = info.name;
      item.addEventListener('click',function(){
        searching = true;
        showMedia(fs.root, this.title);
      },false);
      document.getElementById('container').appendChild(item);
      var icon = document.createElement('span');
      icon.className = 'icon';
      icon.innerHTML = '&#xf00c5;';
      item.appendChild(icon);
      var text = document.createElement('span');
      text.className = 'text';
      text.innerHTML = info.name;
      item.appendChild(text);
    })(i, fileSystemArray[i]);
  }
}

function listMedia(Entries){
  for(var i = 0; i < Entries.length; i++){
    if(!searching){
      break;
    }
    if(Entries[i].isFile){
      var ext = Entries[i].name.substr(Entries[i].name.lastIndexOf('.') + 1).toLowerCase();
      var type = (imgFormats.indexOf(ext)>=0?'image':(vidFormats.indexOf(ext)>=0?
        'video':(audFormats.indexOf(ext)>=0?'music':null)));
      if(!type){
        continue;
      }
      var item = document.createElement('span');
      item.className = 'item';
      item.title = Entries[i].name;
      // item.addEventListener('click',function(Entries[i]){
      //
      // },false);
      item.onclick = (function(Entry){

      })(Entries[i]);
      document.getElementById('container').appendChild(item);
      var icon = document.createElement('span');
      icon.className = 'icon';
      icon.innerHTML = (type == 'image'?'&#xf0137;':(type == 'video'?'&#xf0162;':'&#xf0036;'));
      item.appendChild(icon);
      var text = document.createElement('span');
      text.className = 'text';
      text.innerHTMl = Entries[i].name;
      item.appendChld(text);
    }else if(Entries[i].isDirectory){
      var dirReader = Entries[i].createReader();
      dirReader.readEntries(listMedia);
    }
  }
}

function showMedia(Entry, path){
  document.getElementById('container').innerHTML = '';
  document.getElementById('subpath').innerHTML = '<span class="name">' + path + '</span><span class="pointer">>></span>';
  var dirReader = Entry.createReader();
  dirReader.readEntries(listMedia);
}

getMedia();
