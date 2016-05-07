var countryArr = [
  '乌克兰',
  '俄罗斯',
  '克罗地亚',
  '冰岛',
  '匈牙利',
  '北爱尔兰',
  '土耳其',
  '奥地利',
  '威尔士',
  '德国',
  '意大利',
  '捷克',
  '斯洛伐克',
  '比利时',
  '法国',
  '波兰',
  '爱尔兰',
  '瑞典',
  '瑞士',
  '罗马尼亚',
  '英格兰',
  '葡萄牙',
  '西班牙',
  '阿尔巴尼亚'
];

function generator(){
  var container = document.getElementById('container');
  var country = '', htmlStr = '';
  for(var i = 0 , len = countryArr.length ; i < len ; i ++){
    country = countryArr[i];
    htmlStr += '<div id="country_'+ i +'"><img src="images/'+ country +'.png" alt=""></div>';
  }
  container.innerHTML = htmlStr;
}

generator();
