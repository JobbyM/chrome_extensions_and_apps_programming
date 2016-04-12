chrome.management.getAll(function(exInfoArray){
  console.log(exInfoArray);
  for(var i = 0 , len = exInfoArray.length; i < len; i ++){
    console.log(exInfoArray[i]);
  }
  var exId = exInfoArray[0].id;
  chrome.management.get(exId, function(exInfo){
    console.log(exInfo)
  });
  chrome.management.getPermissionWarningsById(exId, function(permissionWarningArray){
    console.log(permissionWarningArray);
  });
});
