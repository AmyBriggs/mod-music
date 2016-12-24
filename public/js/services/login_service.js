app.service('LoginService', function($resource){
  return {
    signup: $resource('signup', {id: '@id'}, {
      'save': {
        method: 'POST',
        isArray: false
      }
    }),

    login: $resource('login/:id', {id: '@id'}, {
      'save': {
        method: 'POST',
        isArray: false
      }
    })
  }
})
