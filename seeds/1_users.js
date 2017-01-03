exports.seed = function(knex) {
 return knex('users').del()
  .then(() => {
   return knex('users').insert([{
    username: 'amylbd',
    hashed_pass: '$2a$08$SFfc0YbRbeA580.czP58.uaCpiiyQpIWjt58yQQOgCLmgeKgfBI4m',
    views: 468,
    desc: 'Sometimes I play piano with my nose. Sometimes I build full-stack apps.',
    img: 'img/Amy.jpg'
   }, {
    username: 'lisa',
    hashed_pass: '$2a$08$SFfc0YbRbeA580.czP58.uaCpiiyQpIWjt58yQQOgCLmgeKgfBI4m',
    views: 124,
    desc: 'One time the DJ went on a 30-min bathroom break and asked me to sub in. I pressed buttons, twisted knobs, and became a DJ. Fooling everyone everyday.',
    img: 'img/Lisa.jpg'
   }, {
    username: 'yames',
    hashed_pass: '$2a$08$SFfc0YbRbeA580.czP58.uaCpiiyQpIWjt58yQQOgCLmgeKgfBI4m',
    views: 275,
    desc: "You'll never know what I'm listening to and you don't want to know.",
    img: 'img/yames.jpg'
   }, {
    username: 'crAAg',
    hashed_pass: '$2a$08$SFfc0YbRbeA580.czP58.uaCpiiyQpIWjt58yQQOgCLmgeKgfBI4m',
    views: 780,
    desc: 'My beats are probably better than your beats. Untz untz.',
    img: 'img/craag.jpg'
   }, {
    username: 'bouchybanjo',
    hashed_pass: '$2a$08$SFfc0YbRbeA580.czP58.uaCpiiyQpIWjt58yQQOgCLmgeKgfBI4m',
    views: 916,
    desc: 'Beautiful banjo bliss is better than bland blunt beats.',
    img: 'img/bouchy.jpg'
   }, {
    username: 'ekopeisdope',
    hashed_pass: '$2a$08$SFfc0YbRbeA580.czP58.uaCpiiyQpIWjt58yQQOgCLmgeKgfBI4m',
    views: 352,
    desc: 'Dope beat$. Fre$h beat$.',
    img: 'img/ekope.jpg'
   }, {
    username: 'ziopads',
    hashed_pass: '$2a$08$SFfc0YbRbeA580.czP58.uaCpiiyQpIWjt58yQQOgCLmgeKgfBI4m',
    views: 819,
    desc: 'I own a lot of synths and I know how to use them all.',
    img: 'img/ziopads.jpg'
   },{
    username: 'decafgrandeoxytank',
    hashed_pass: '$2a$08$SFfc0YbRbeA580.czP58.uaCpiiyQpIWjt58yQQOgCLmgeKgfBI4m',
    views: 700,
    desc: 'Inhale oxygen. Exhale beats.',
    img: 'img/oxy.jpg'
   }]);
  });
};
