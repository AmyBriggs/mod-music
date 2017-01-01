exports.seed = function(knex) {
 return knex('users').del()
  .then(() => {
   return knex('users').insert([{
    username: 'amylbd',
    hashed_pass: '$2a$08$SFfc0YbRbeA580.czP58.uaCpiiyQpIWjt58yQQOgCLmgeKgfBI4m',
    views: 500,
    desc: 'Piano woman',
    img: 'img/Amy.jpg'
   }, {
    username: 'lisa',
    hashed_pass: '$2a$08$SFfc0YbRbeA580.czP58.uaCpiiyQpIWjt58yQQOgCLmgeKgfBI4m',
    views: 250,
    desc: 'I built this app.',
    img: 'img/Lisa.jpg'
   }]);
  });
};
