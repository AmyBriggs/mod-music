app.service('ProfileService', function($http){
 return {
   get: function(user){
     return $http.post('/profile', user).then(function(data) {
        return data.data;
     })
   }
 }
 })
