app.service('PersonalService', function($http){
 return {
   get: function(user){
     return $http.post('/profile/:id', user).then(function(data) {
       console.log(data.data);
        return data.data;
     })
   }
 }
 })
