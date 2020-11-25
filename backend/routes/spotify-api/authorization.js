// THIS DOESNT BELONG HERE!!! But for dev purposes keeping it here for now, move for deployment to hide keys/secret
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
spotifyApi.setAccessToken('BQA-NnODlIfnH1kblB8ohwnV8l-HuyZlqhZkyh7IeDVvSb6HN_xeWYgopZj9M5XgY-yeshvuMy4uL3pafCj3GcZ-p4o3DiYO_jiv3Wp_HOO51ydLDL3sd974DZhf2Zmz8L7ZRjTz74tqVUeHbkdS-FbISBzssQ');

module.exports = spotifyApi;
