exports.seed = function(knex) {
 return knex('users').del()
  .then(() => {
   return knex('users').insert([{
    username: 'amylbd',
    hashed_pass: '$2a$08$SFfc0YbRbeA580.czP58.uaCpiiyQpIWjt58yQQOgCLmgeKgfBI4m',
    views: 500,
    desc: 'Piano woman',
    img: 'http://furlingtonpost.com/wp-content/uploads/2015/10/Screen-shot-2015-10-21-at-8.05.38-PM.png'
   }, {
    username: 'lisa',
    hashed_pass: '$2a$08$SFfc0YbRbeA580.czP58.uaCpiiyQpIWjt58yQQOgCLmgeKgfBI4m',
    views: 250,
    desc: 'I built this app.',
    img: 'https://www.overthinkingit.com/wp-content/uploads/2013/10/Lemongrab.jpg'
   }]);
  });
};
