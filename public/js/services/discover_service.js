app.service('DiscoverService', function($http){
 return {
   get: function(){
     return $http.get('/discover').then(function(data) {
        console.log(data.data);
     })
   }
 }
 })
