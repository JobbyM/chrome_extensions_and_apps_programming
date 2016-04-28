function getMedia(){
  chrome.mediaGalleries.getMediaFileSystems({
    interactive: 'if_needed'
  }, listMediaGalleries);
}

function listMediaGalleries(fileSystemArray){
  document.getElementById('container').innerHTML = '';
  for(var i = 0 ; i < fileSystemArray.length; i ++){
    var info = chrome.mediaGalleries.getMediaFileSystemMetadata(fileSystemArray[i]);
    console.log(info);
    var item = document.createElement('span');
    item.className = 'item';
    item.title = info.name;
    document.getElementById('container').appendChild(item);
    var icon = document.createElement('span');
    icon.className = 'icon';
    icon.innerHTML = '&#xf00c5;';
    item.appendChild(icon);
    var text = document.createElement('span');
    text.className = 'text';
    text.innerHTML = info.name;
    item.appendChild(text);
  }
}

getMedia();

document.getElementById('edit').addEventListener('click',function(){
  document.getElementById('container').innerHTML = '';
  chrome.mediaGalleries.getMediaFileSystems({
    interactive: 'yes'
  },listMediaGalleries);
},false);

var scanning = false;

document.getElementById('scan').addEventListener('click',function(){
  scanning ?
    chrome.mediaGalleries.startMediaScan && chrome.mediaGalleries.startMediaScan():
    chrome.mediaGalleries.cancelMediaScan && chrome.mediaGalleries.cancelMediaScan();
},false);

document.getElementById('error').addEventListener('click',function(){
  this.style.dislay = 'none';
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
