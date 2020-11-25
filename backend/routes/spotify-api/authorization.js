// Possibly rename this file?
// Refer to https://developer.spotify.com/documentation/web-api/reference/ for info about spotify's endpoints
// Refer to https://github.com/thelinmichael/spotify-web-api-node for info about the usage of the wrapper module for the spotify api that we are using
// -------------------------------------------------------------------
var SpotifyWebApi = require('spotify-web-api-node');

// Remember to change redirectUri for deployment
var spotifyApi = new SpotifyWebApi({
    clientId: 'd1f357b5e08e444682e89704869b769c',
    clientSecret: '898b527f70c84fa0b09d45bfbdbb4635',
    redirectUri: 'http://localhost:3000/'
});

// Pass the spofity user's access token from the frontend, it is hard-coded for now
spotifyApi.setAccessToken('BQBLb9bvIGKEQA-yWpoIxlKppJg9Ty5xCSFvYH3_L579Ag47H4y1wRq4fPkEIJYszAwxbjk0bATAnCifr8GrME_58kKwKon2hRmDZHSwJAUOmqXzMLQbNOKQ4l1v-9CrCpcUUrHy-M8myQ7kuI8N-Arjtc3v3g');

module.exports = spotifyApi;
