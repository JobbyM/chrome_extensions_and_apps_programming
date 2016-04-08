// var result = {
//     "errNo": "0",
//     "data": {
//         "weather": {
//             "setting": {
//                 "city": "北京"
//             },
//             "content": {
//                 "week": "周五 04月08日 ",
//                 "city": "北京",
//                 "today": {
//                     "time": "周五 04月08日 (实时：20℃)",
//                     "date": "04月08日",
//                     "img": [
//                         "http://s1.bdstatic.com/r/www/aladdin/img/new_weath/bigicon/1.png",
//                         "http://s1.bdstatic.com/r/www/aladdin/img/new_weath/bigicon/1.png"
//                     ],
//                     "condition": "晴",
//                     "wind": "南风3-4级",
//                     "temp": "20℃",
//                     "link": "http://www.weather.com.cn/weather/101010100.shtml",
//                     "imgs": {
//                         "0": "a0",
//                         "1": "a0"
//                     },
//                     "pm25": "41",
//                     "pollution": "0",
//                     "pm25url": "//www.baidu.com/s?wd=%E5%8C%97%E4%BA%AC%E7%A9%BA%E6%B0%94%E8%B4%A8%E9%87%8F%E6%8C%87%E6%95%B0&tn=baidutop10&rsv_idx=2",
//                     "pmdate": "2016-04-08"
//                 },
//                 "tomorrow": {
//                     "time": "周六",
//                     "date": "04月09日",
//                     "img": [
//                         "http://s1.bdstatic.com/r/www/aladdin/img/new_weath/icon/1.png",
//                         ""
//                     ],
//                     "condition": "晴",
//                     "wind": "微风",
//                     "temp": "26 ~ 8℃",
//                     "link": "http://www.weather.com.cn/weather/101010100.shtml",
//                     "imgs": {
//                         "0": "a0",
//                         "1": "a0"
//                     },
//                     "pm25": "41",
//                     "pollution": "0",
//                     "pm25url": "//www.baidu.com/s?wd=%E5%8C%97%E4%BA%AC%E7%A9%BA%E6%B0%94%E8%B4%A8%E9%87%8F%E6%8C%87%E6%95%B0&tn=baidutop10&rsv_idx=2",
//                     "pmdate": "2016-04-08"
//                 },
//                 "thirdday": {
//                     "time": "周日",
//                     "date": "04月10日",
//                     "img": [
//                         "http://s1.bdstatic.com/r/www/aladdin/img/new_weath/icon/1.png",
//                         ""
//                     ],
//                     "condition": "晴转多云",
//                     "wind": "微风",
//                     "temp": "20 ~ 8℃",
//                     "link": "http://www.weather.com.cn/weather/101010100.shtml",
//                     "imgs": {
//                         "0": "a0",
//                         "1": "a0"
//                     },
//                     "pm25": "//www.baidu.com/s?wd=%E5%8C%97%E4%BA%AC%E7%A9%BA%E6%B0%94%E8%B4%A8%E9%87%8F%E6%8C%87%E6%95%B0&tn=baidutop10&rsv_idx=2",
//                     "pollution": "0",
//                     "pm25url": "",
//                     "pmdate": "2016-04-08"
//                 },
//                 "fourthday": {
//                     "time": "周一",
//                     "date": "04月11日",
//                     "img": [
//                         "http://s1.bdstatic.com/r/www/aladdin/img/new_weath/icon/5.png",
//                         ""
//                     ],
//                     "condition": "多云转阴",
//                     "wind": "南风3-4级",
//                     "temp": "24 ~ 11℃",
//                     "link": "http://www.weather.com.cn/weather/101010100.shtml",
//                     "imgs": {
//                         "0": "a1",
//                         "1": "a1"
//                     }
//                 },
//                 "fifthday": {
//                     "time": "周二",
//                     "date": "04月12日",
//                     "img": [
//                         "http://s1.bdstatic.com/r/www/aladdin/img/new_weath/icon/3.png",
//                         ""
//                     ],
//                     "condition": "阴转多云",
//                     "wind": "微风",
//                     "temp": "23 ~ 11℃",
//                     "link": "http://www.weather.com.cn/weather/101010100.shtml",
//                     "imgs": {
//                         "0": "a2",
//                         "1": "a2"
//                     }
//                 },
//                 "linkseven": "http://www.weather.com.cn/weather/101010100.shtml#7d",
//                 "source": {
//                     "name": "中国气象频道",
//                     "url": "http://www.mywtv.cn/"
//                 },
//                 "cityname": "北京",
//                 "calendar": {
//                     "time": "1460084461151",
//                     "lunar": "三月初二",
//                     "festival": false,
//                     "weatherSourceUrl": "http://www.weather.com.cn/weather/101010100.shtml#7d"
//                 },
//                 "currenttemp": "20℃",
//                 "pslink": "//www.baidu.com/s?tn=baidutop10&rsv_idx=2&wd=%E5%8C%97%E4%BA%AC%E5%A4%A9%E6%B0%94%E9%A2%84%E6%8A%A5",
//                 "weatherType": "aladdin",
//                 "isauto": false,
//                 "ipcity": "北京",
//                 "province": "北京"
//             }
//         }
//     }
// };

var containerEl = null;

// var url = 'https://www.baidu.com/home/other/data/weatherInfo?city=%E5%8C%97%E4%BA%AC&indextype=manht&_req_seqid=0xb7c84ad50002ef10&asyn=1&t=1460084693191&sid=1465_18241_17945_19558_18560_17001_15276_12326_19597';
var url = 'https://www.baidu.com/home/other/data/weatherInfo?indextype=manht&asyn=1&sid=1465_18241_17945_19558_18560_17001_15276_12326_19597';

function httpRequest(url, callback){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      callback(xhr.responseText);
    }
  };
  xhr.send();
}
function updateWeathear(date, content){
  var dateData = content[date];
  var dateEl = containerEl.querySelector("."+date);
  var everydata_title = "";
  var everyday_icon = 'https://ss0.bdstatic.com/k4oZeXSm1A5BphGlnYG/icon/weather/aladdin/jpg/';

  switch(date){
    case "today":
      everydata_title = "今天（" + dateData.time.split(" ")[0] + "）";
      break;
    case "tomorrow":
      everydata_title = "明天（" + dateData.time + "）";
      break;
    case "thirdday":
      everydata_title = "后天（" + dateData.time + "）";
      break;
    default:
      everydata_title = dateData.time;
  }
  // console.log(everydata_title);
  dateEl.querySelector('.everyday-title').textContent = everydata_title;
  everyday_icon += dateData.imgs["0"] + ".jpg";
  dateEl.querySelector('.everyday-icon').setAttribute('src', everyday_icon);
  dateEl.querySelector('.everyday-temp').textContent = dateData.temp;
  dateEl.querySelector('.everyday-condition').textContent = dateData.condition;
  dateEl.querySelector('.everyday-wind').textContent = dateData.wind;
}

function showWeather(result){
  var result = JSON.parse(result);
  if(result.errNo === "0"){
    var content = result.data.weather.content;
    var dateArr = ['today','tomorrow','thirdday','fourthday','fifthday']

    containerEl = document.querySelector('.container');
    containerEl.style.display = 'none';

    for(var i = 0, len = dateArr.length; i < len; i ++){
      updateWeathear(dateArr[i], content);
    }

    containerEl.style.display = 'block';
  }else{

  }
}

function generatorURL(){
  var city = localStorage.getItem('city') || '北京';
  city = encodeURIComponent(city);
  var t = new Date().getTime();
  var _req_seqid = 0xb7c84ad50002ef10;
  url += '&city=' + city + '&t=' + t + '&_req_seqid=' + _req_seqid;
  console.log('generatorURL:' + url);
  return url;
}

httpRequest(generatorURL(), function(res){
  showWeather(res);
});
