// app.service('ProfileService', function($http){
//   return {
//     get: function(userObj){
//       return $http.get('/profile', userObj).then(function(data) {
//         console.log(data);
//          return data.data;
//       })
//     }
//   }
// })
app.service('ProfileService', function($http){
 return {
   get: function(userObj){
     return $http.post('/profile', userObj).then(function(data) {
       console.log(data.data);
        return data.data;
     })
   }
 }
 })
