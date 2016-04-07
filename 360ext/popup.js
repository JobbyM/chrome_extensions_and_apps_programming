var kittenGenerator = {
  kittensOnFlickr_: 'http://epg.is.ysten.com:8080/yst-epg/web/program!getMovieList.action?catgId=219718&pageNumber=1&pageSize=1200&templateId=56',

  requestKittens: function(){
    var req = new XMLHttpRequest();
    req.open('GET', this.kittensOnFlickr_, true);
    req.onload = this.showPhotos_.bind(this);
    req.send(null);
  },

  str2xml_: function(xmlString){
    var xmlDoc;
    xmlDoc = new DOMParser();
    xmlDoc.async = "false";
    try{
      xmlDoc = xmlDoc.parseFromString(xmlString, "text/xml");
    }catch(e){
      console.log('createDomError:' + e.toString())
    }
    return xmlDoc;
  },

  showPhotos_: function(e){
    console.log(e.target);
    var kittens = this.str2xml_(e.target.responseText);
    console.log(kittens);
    kittens = kittens.querySelectorAll('menu')
    for(var i=0;i < kittens.length; i++){
      var img = document.createElement('img');
      img.src = this.constructKittenURL_(kittens[i]);
      img.setAttribute('alt',this.constructKittenURL_(kittens[i]));
      document.body.appendChild(img);
    }
  },

  constructKittenURL_: function(photo){
    return photo.getElementsByTagName('image')[0].textContent;
  },

  constructKittenAlt_: function(photo){
    return photo.getElementsByTagName('name')[0].textContent;
  }
};

document.addEventListener('DOMContentLoaded', function(){
  kittenGenerator.requestKittens();
})