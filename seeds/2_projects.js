exports.seed = function(knex) {
 return knex('projects').del()
  .then(() => {
   return knex('projects').insert([{
    user_id: 1,
    views: 125,
    title: 'My Project 1',
    desc: 'My first project ever. Rad.',
    genre: 'Bluegrass',
    votes: 798
   }, {
    user_id: 1,
    views: 126,
    title: 'My Project 2',
    desc: 'My second project ever. Double Rad.',
    genre: 'R&B',
    votes: 799
   }, {
    user_id: 2,
    views: 121,
    title: 'My Project 1',
    desc: 'My first project ever. Double Rad.',
    genre: 'Electronic',
    votes: 799
   }, {
    user_id: 2,
    views: 122,
    title: 'My Project 2',
    desc: 'My second project ever. Rad.',
    genre: 'R&B',
    votes: 799
   }]);
  });
};
