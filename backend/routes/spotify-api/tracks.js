/*
    Endpoints for retrieving information about one or more tracks from the Spotify catalog.

    Method and Endpoint             Usage:                            Returns:
    GET	/tracks/{id}	            Get a track 	                  track
    GET	/tracks	                    Get several tracks	              tracks

    https://developer.spotify.com/documentation/web-api/reference/tracks/
*/

const express = require("express");
const router = express.Router();

// Pull spotifyApi from authorization.js file
const spotifyApi = require('./authorization');


/*
  Obtain info about a track given the track ID.

  Optional Query Parameter:
    market: An ISO 3166-1 alpha-2 country code. Provide this parameter if you want to apply Track Relinking. (https://developer.spotify.com/documentation/general/guides/track-relinking-guide/)

  Endpoint structure example: localhost:3000/spotify-api/tracks/{trackId}
*/
router.get('/:id', async (req, res) => {
    const trackID = req.params.id;
    const { market } = req.query;

    let optQueryParams = {};
    if (market) optQueryParams.market = market;

    spotifyApi.getTrack(trackID, optQueryParams).then(
        (data) => {
            res.json(data.body);
        },
        (err) => {
            res.json(err);
        }
    );
});

/*
  Obtain severeal tracks given multiple track IDs

  Required Query Parameter:
    ids:      A comma-separated list of the Spotify IDs for the tracks (Maximum=50)
  Optional Query Parameter:
    market:   An ISO 3166-1 alpha-2 country code. Provide this parameter if you want to apply Track Relinking. (https://developer.spotify.com/documentation/general/guides/track-relinking-guide/)

  Endpoint structure example: localhost:3000/spotify-api/tracks?ids=3P4BLYkv74TfpBFsaY2IgU
*/
router.get('/', async (req, res) => {
    const { ids, market } = req.query;

    if (!ids) return res.status(400).json({ error: 'Required query parameter \'ids\' not provided' });

    let optQueryParams = {};
    if (market) optQueryParams.market = market;

    const trackIDList = ids.split(',');

    spotifyApi.getTracks(trackIDList, optQueryParams).then(
        (data) => {
            res.json(data.body);
        },
        (err) => {
            res.json(err);
        }
    );
});


module.exports = router;