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
    img: 'http://orig12.deviantart.net/317d/f/2009/255/d/f/skull_and_headphones_by_hiddenmoves.jpg'
   }, {
    username: 'crAAg',
    hashed_pass: '$2a$08$SFfc0YbRbeA580.czP58.uaCpiiyQpIWjt58yQQOgCLmgeKgfBI4m',
    views: 780,
    desc: 'My beats are probably better than your beats. Untz untz.',
    img: 'https://s-media-cache-ak0.pinimg.com/736x/dc/c7/e1/dcc7e114efe4151a8b862086d22a8205.jpg'
   }, {
    username: 'bouchybanjo',
    hashed_pass: '$2a$08$SFfc0YbRbeA580.czP58.uaCpiiyQpIWjt58yQQOgCLmgeKgfBI4m',
    views: 916,
    desc: 'Beautiful banjo bliss is better than bland blunt beats.',
    img: 'https://cdn.shopify.com/s/files/1/0204/9822/products/clawgrass-banjo---neck-and-pot_1024x1024.jpeg?v=1447348916'
   }, {
    username: 'ekopeisdope',
    hashed_pass: '$2a$08$SFfc0YbRbeA580.czP58.uaCpiiyQpIWjt58yQQOgCLmgeKgfBI4m',
    views: 352,
    desc: 'Dope beat$. Fre$h beat$.',
    img: 'http://www.lovethispic.com/uploaded_images/31279-Sound-Board.jpg'
   }, {
    username: 'ziopads',
    hashed_pass: '$2a$08$SFfc0YbRbeA580.czP58.uaCpiiyQpIWjt58yQQOgCLmgeKgfBI4m',
    views: 819,
    desc: 'I own a lot of synths and I know how to use them all.',
    img: 'http://www.creatingtrance.com/wp-content/uploads/2014/04/giant-modular-synth.jpg'
   },{
    username: 'decafgrandeoxytank',
    hashed_pass: '$2a$08$SFfc0YbRbeA580.czP58.uaCpiiyQpIWjt58yQQOgCLmgeKgfBI4m',
    views: 700,
    desc: 'Inhale oxygen. Exhale beats.',
    img: 'http://www.harborfreight.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_11359.jpg'
   }]);
  });
};
