module.exports = {
 development: {
  client: 'pg',
  connection: 'postgres://localhost/modmusic'
 },
 production: {
  client: 'pg',
  connection: process.env.DATABASE_URL
 }
};
