app.service('BuildService', function($http){
  return {
    save: function(projData){
      return $http.post('/save', projData).then(function(data) {
         return data.data;
      })
    },
    load: function(projData){
      return $http.post('/load', projData).then(function(data){
        console.log(data.data);
        return data.data;
      })
    }
  }
})
