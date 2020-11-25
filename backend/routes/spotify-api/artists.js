/*
  Endpoints for retrieving information about one or more artists from the Spotify catalog.
  
  Method and Endpoint                   Usage:                            Returns:
  GET	artists/{id}	                    Get an Artist                     artist
  GET	artists/{id}/albums	              Get an Artist's Albums            albums
  GET	artists/{id}/top-tracks	          Get an Artist's Top Tracks        tracks
  GET	artists/{id}/related-artists	    Get an Artist's Related Artists	  artists
  GET	artists	                          Get Several Artists	              artists
*/

// Example Artist IDs
// King Gizz: 6XYvaoDGE0VmRt83Jss9Sn
// Elvis:     43ZHCT0cAZBISjO8DG9PnE

const express = require("express");
const router = express.Router();

// Pull spotifyApi from authorization.js file
const spotifyApi = require('./authorization');


/*
  Obtain info about an artist given their artist ID.
  Endpoint structure example: localhost:3000/spotify-api/artists/{artistId}
*/
router.get('/:id', async (req, res) => {
  const artistID = req.params.id;

  spotifyApi.getArtist(artistID).then(
    (data) => {
      res.json(data.body);
    },
    (err) => {
      res.json(err);
    }
  );
});


/*
  Obtain the albums of a given artist given their artist ID.

  Optional Query Parameters:
    limit:          The number of album objects to return. Default=20, Min=1, Max=50
    offset:         The index of the first album to return. Default=0
    country:        An ISO 3166-1 alpha-2 country code (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
                    For example, for albums available in Sweden: country=SE
                    If not given, results will be returned for all countries and you are likely to get duplicate results per album, one for each country in which the album is available!
    include_groups: A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned. 
                    Valid values are:
                    - album
                    - single
                    - appears_on
                    - compilation
                    For example: include_groups=album,single.

  Endpoint structure example: localhost:3000/spotify-api/artists/{artistId}/albums?offset=0&limit=20&country=US&include_groups=album,single
  Another example: http://localhost:3000/spotify-api/artists/43ZHCT0cAZBISjO8DG9PnE/albums?country=US for elvis
*/
router.get('/:id/albums', async (req, res) => {
  const artistID = req.params.id;
  const { limit, offset, country, include_groups } = req.query

  let queryParams = {}

  if (limit) queryParams.limit = limit;
  if (offset) queryParams.offset = offset;
  if (country) queryParams.country = country;
  if (include_groups) queryParams.include_groups = include_groups;

  spotifyApi.getArtistAlbums(artistID, queryParams).then(
    (data) => {
      res.json(data.body);
    },
    (err) => {
      res.json(err);
    }
  );
});


/*
  Obtain info about an artist given their artist ID.

  Required Query Parameter:
    country:        An ISO 3166-1 alpha-2 country code (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
  
  Endpoint structure example: localhost:3000/spotify-api/artists/{artistId}/top-tracks?country=US
*/
router.get('/:id/top-tracks', async (req, res) => {
  const artistID = req.params.id;
  const { country } = req.query

  spotifyApi.getArtistTopTracks(artistID, country).then(
    (data) => {
      res.json(data.body);
    },
    (err) => {
      res.json(err);
    }
  );
});


/*
  Obtain artists related to the artist given their artist ID.
  Endpoint structure example: localhost:3000/spotify-api/artists/{artistId}/related-artists
*/
router.get('/:id/related-artists', async (req, res) => {
  const artistID = req.params.id;

  spotifyApi.getArtistRelatedArtists(artistID).then(
    (data) => {
      res.json(data.body);
    },
    (err) => {
      res.json(err);
    }
  );
});


/*
  Obtain severeal artists given multiple artist IDs

  Required Query Parameter:
    ids: A comma=separated list of the Spotify IDs for the artists (Maximum=50)

  Endpoint structure example: localhost:3000/spotify-api/artists?ids=43ZHCT0cAZBISjO8DG9PnE,6XYvaoDGE0VmRt83Jss9Sn
*/
router.get('/', async (req, res) => {
  const { ids } = req.query;

  const artistIDList = ids.split(',');

  spotifyApi.getArtists(artistIDList).then(
    (data) => {
      res.json(data.body);
    },
    (err) => {
      res.json(err);
    }
  );
});


module.exports = router;