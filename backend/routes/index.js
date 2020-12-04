const spotifyArtistsRoutes = require('./spotify-api/artists');
const spotifyAlbumsRoutes = require('./spotify-api/albums');
const spotifySearchRoutes = require('./spotify-api/search');
const spotifyUserRoutes = require('./spotify-api/users');
const spotifyMeRoutes = require('./spotify-api/me');
const spotifyPlaylistRoutes = require('./spotify-api/playlists');
const spotifyTracksRoutes = require('./spotify-api/tracks');

const constructorMethod = (app) => {
  app.use('/spotify-api/artists', spotifyArtistsRoutes);
  app.use('/spotify-api/albums', spotifyAlbumsRoutes);
  app.use('/spotify-api/search', spotifySearchRoutes);
  app.use('/spotify-api/users', spotifyUserRoutes);
  app.use('/spotify-api/me', spotifyMeRoutes);
  app.use('/spotify-api/playlists', spotifyPlaylistRoutes);
  app.use('/spotify-api/tracks', spotifyTracksRoutes);

  app.use('/test', (req, res) => {
    res.send('Hello test!');
  });

  app.use('/', (req, res) => {
    res.send('Hello there!');
  });
}

module.exports = constructorMethod;