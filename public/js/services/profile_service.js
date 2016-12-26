app.service("ProfileService", function($resource) {
  return {
    users: $resource('profile', {id: '@id'}, {
      'update': {
        method: 'PUT'
      },
      'get': {
        method:'GET',
        isArray:false
      },
      'save': {
        method:'POST',
        isArray:true
      }
    })
  }

})
