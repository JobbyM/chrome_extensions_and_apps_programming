var city = localStorage.getItem('city') || '北京';
document.getElementById('city').value = city;
document.getElementById('save').addEventListener('click',function(){
  localStorage.setItem('city', document.getElementById('city').value);
  alert('保存成功');
},false);
