app.service('LoginService', function($resource){
  return {
    // signup: $resource('signup/:id', {id: '@id'}, {
    //   'save': {
    //     method: 'POST',
    //     isArray: true
    //   }
    // }),

    login: $resource('login/:id', {id: '@id'}, {
      'save': {
        method: 'POST',
        isArray: false
      }
    })
  }
})
