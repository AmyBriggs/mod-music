app.service('SaveService', function($http){
  return {
    save: function(projData){
      console.log(projData);
      return $http.post('/save', projData).then(function(data) {
         return data.data;
      })
    }
  }
})
