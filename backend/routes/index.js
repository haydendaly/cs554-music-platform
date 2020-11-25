const spotifyArtistsRoutes = require('./spotify-api/artists');
const spotifyAlbumsRoutes = require('./spotify-api/albums');

const constructorMethod = (app) => {
  app.use('/spotify-api/artists', spotifyArtistsRoutes);
  app.use('/spotify-api/albums', spotifyAlbumsRoutes);

  app.use('/test', (req, res) => {
    res.send('Hello test!');
  });

  app.use('/', (req, res) => {
    res.send('Hello there!');
  });
}

module.exports = constructorMethod;

