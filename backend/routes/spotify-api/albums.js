/*
  Endpoints for retrieving information about one or more artists from the Spotify catalog.
  
  Method and Endpoint                   Usage:                            Returns:
  GET	/v1/albums/{id}	                  Get an Album	                    album
  GET	/v1/albums/{id}/tracks	          Get an Album's Tracks	            tracks
  GET	/v1/albums	                      Get Several Albums	              albums
*/

// Example Album IDs:
// IIYMF: 31jHyTSpj8nWQgV45gvZA3
// FMB:   4G9ANFGk9579p2uirMbVT0

const express = require("express");
const router = express.Router();

// Pull spotifyApi from authorization.js file
const spotifyApi = require('./authorization');


/*
  Obtain info about an album given the album ID.

  Optional Query Parameter:
    market: An ISO 3166-1 alpha-2 country code. Provide this parameter if you want to apply Track Relinking. (https://developer.spotify.com/documentation/general/guides/track-relinking-guide/)

  Endpoint structure example: localhost:3000/spotify-api/albums/{albumId}
*/
router.get('/:id', async (req, res) => {
  const albumID = req.params.id;
  const { market } = req.query;

  let queryParams = {};
  if (market) queryParams.market = market

  spotifyApi.getAlbum(albumID, queryParams).then(
    (data) => {
      res.json(data.body);
    },
    (err) => {
      res.json(err);
    }
  );
});


/*
  Obtain information about an album's tracks

  Optional Query Parameters:
    limit:    The number of album objects to return. Default=20, Min=1, Max=50
    offset:   The index of the first album to return. Default=0
    market:   An ISO 3166-1 alpha-2 country code. Provide this parameter if you want to apply Track Relinking. (https://developer.spotify.com/documentation/general/guides/track-relinking-guide/)

  Endpoint structure example: localhost:3000/spotify-api/albums/{albumId}/tracks?offset=0&limit=20&market=US
*/
router.get('/:id/tracks', async (req, res) => {
  const albumID = req.params.id;
  const { limit, offset, market } = req.query

  let queryParams = {}

  if (limit) queryParams.limit = limit;
  if (offset) queryParams.offset = offset;
  if (market) queryParams.market = market;

  spotifyApi.getAlbumTracks(albumID, queryParams).then(
    (data) => {
      res.json(data.body);
    },
    (err) => {
      res.json(err);
    }
  );
});


/*
  Obtain severeal albums given multiple albums IDs

  Required Query Parameter:
    ids:      A comma=separated list of the Spotify IDs for the albums (Maximum=50)
  Optional Query Parameter:
    market:   An ISO 3166-1 alpha-2 country code. Provide this parameter if you want to apply Track Relinking. (https://developer.spotify.com/documentation/general/guides/track-relinking-guide/)

  Endpoint structure example: localhost:3000/spotify-api/albums?ids=31jHyTSpj8nWQgV45gvZA3,4G9ANFGk9579p2uirMbVT0
*/
router.get('/', async (req, res) => {
  const { ids, market } = req.query;

  let queryParams = {};
  if (market) queryParams.market = market

  const albumIDList = ids.split(',');

  spotifyApi.getAlbums(albumIDList, queryParams).then(
    (data) => {
      res.json(data.body);
    },
    (err) => {
      res.json(err);
    }
  );
});

module.exports = router;