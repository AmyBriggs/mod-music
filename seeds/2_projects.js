exports.seed = function(knex) {
 return knex('projects').del()
  .then(() => {
   return knex('projects').insert([{
    user_id: 1,
    views: 125,
    title: 'grass is blue',
    desc: 'My first project ever. Rad.',
    genre: 'Alternative',
    votes: 111
   }, {
    user_id: 1,
    views: 146,
    title: 'comfort zone',
    desc: 'My second project ever. Double Rad.',
    genre: 'Classical',
    votes: 833
   }, {
    user_id: 2,
    views: 144,
    title: 'untz untz',
    desc: 'only drum and bass. deals with it.',
    genre: 'Electronic',
    votes: 188
   }, {
    user_id: 2,
    views: 524,
    title: "destiny's parent",
    desc: "destiny's child's grandparent",
    genre: 'R&B',
    votes: 249
   }, {
    user_id: 3,
    views: 526,
    title: 'silence',
    desc: 'all the instruments, no notes. so deep.',
    genre: 'Alternative',
    votes: 142
   }, {
    user_id: 3,
    views: 888,
    title: "turn uppp",
    desc: "the opposite of silence",
    genre: 'Pop',
    votes: 145
   }, {
    user_id: 3,
    views: 527,
    title: 'aerosmith clone',
    desc: "i don't want to miss a thing",
    genre: 'Rock',
    votes: 143
   }, {
    user_id: 4,
    views: 900,
    title: "classy crAAg",
    desc: "a classical piece by classy ol' me",
    genre: 'Classical',
    votes: 838
   }, {
    user_id: 4,
    views: 723,
    title: 'i will rock you',
    desc: 'i will.',
    genre: 'Rock',
    votes: 672
   }, {
    user_id: 5,
    views: 524,
    title: "big imposter banjo",
    desc: "still a string instrument",
    genre: 'Alternative',
    votes: 123
   }, {
    user_id: 5,
    views: 82,
    title: 'oh no',
    desc: 'i think i might be leaving the banjo for these sick beatz',
    genre: 'Electronic',
    votes: 521
   }, {
    user_id: 5,
    views: 124,
    title: "toxic",
    desc: "britney spears acoustic",
    genre: 'Pop',
    votes: 774
   }, {
    user_id: 6,
    views: 523,
    title: 'fre$h',
    desc: 'so fre$h. so clean.',
    genre: 'Electronic',
    votes: 413
   }, {
    user_id: 6,
    views: 435,
    title: "smoove",
    desc: "smoove just like me",
    genre: 'R&B',
    votes: 832
   }, {
    user_id: 7,
    views: 152,
    title: 'polyrhythmic',
    desc: 'is this app polyrhythmic?',
    genre: 'Classical',
    votes: 142
   }, {
    user_id: 8,
    views: 744,
    title: "Rev 22:20",
    desc: "praise be",
    genre: 'Rock',
    votes: 264
   },{
    user_id: 8,
    views: 914,
    title: "and she said...",
    desc: "how did we get ourselves so lost",
    genre: 'Pop',
    votes: 243
   },]);
  });
};
