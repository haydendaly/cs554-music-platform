const spotifyArtistsRoutes = require('./spotify-api/artists');

const constructorMethod = (app) => {
  app.use('/spotify-api/artists', spotifyArtistsRoutes);

  app.use('/test', (req, res) => {
    res.send('Hello test!');
  });

  app.use('/', (req, res) => {
    res.send('Hello there!');
  });
}

module.exports = constructorMethod;

