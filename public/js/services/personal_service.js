app.service('PersonalService', function($http){
 return {
   get: function(user){
     return $http.post('/profile/:id', user).then(function(data) {
        return data.data;
     })
   }
 }
 })
