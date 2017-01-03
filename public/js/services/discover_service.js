app.service('DiscoverService', function($http){
 return {
   get: function(){
     return $http.post('/discover').then(function(data) {
        return data.data;
     })
   }
 }
 })
