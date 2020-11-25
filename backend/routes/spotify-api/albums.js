/*
  Endpoints for retrieving information about one or more artists from the Spotify catalog.
  
  Method and Endpoint                   Usage:                            Returns:
  GET	/v1/albums/{id}	                  Get an Album	                    album
  GET	/v1/albums/{id}/tracks	          Get an Album's Tracks	            tracks
  GET	/v1/albums	                      Get Several Albums	              albums
*/

const express = require("express");
const router = express.Router();

// Pull spotifyApi from authorization.js file
const spotifyApi = require('./authorization');


/*
  Obtain info about an artist given their artist ID.
  Endpoint structure example: localhost:3000/spotify-api/artists/{artistId}
*/
router.get('/:id', async (req, res) => {
  const artistId = req.params.id;

  spotifyApi.getArtist(artistId).then(
    function (data) {
      res.json(data.body);
    },
    function (err) {
      res.json(err);
    }
  );
});