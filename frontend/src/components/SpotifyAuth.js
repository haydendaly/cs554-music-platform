import { useState, useEffect } from 'react'
import qs from 'qs'

const getLink = () => {
    const client_id = 'd1f357b5e08e444682e89704869b769c' // Your client id
    // const client_secret = '898b527f70c84fa0b09d45bfbdbb4635'; // Your secret
    const redirect_uri = 'http://localhost:8000/spotify' // Your redirect uri

    const scope =
        'user-read-recently-played user-read-playback-state user-top-read app-remote-control user-read-currently-playing user-follow-read user-read-playback-position playlist-read-private user-read-email user-read-private user-library-read streaming'

    /**
     * Generates a random string containing numbers and letters
     * @param  {number} length The length of the string
     * @return {string} The generated string
     */
    const generateRandomString = function (length) {
        let text = ''
        const possible =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return text
    }

    var state = generateRandomString(16)

    const querystring = qs.stringify({
        client_id,
        response_type: 'code',
        redirect_uri,
        scope,
        state,
    })

    const url = `https://accounts.spotify.com/authorize?${querystring}`

    return url
}

const SpotifyAuth = () => {
    const [link, setLink] = useState('')

    useEffect(() => {
        const tempLink = getLink()
        setLink(tempLink)
    }, [])

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div>
                <h1>Welcome to SongShare!</h1>
                <p>
                    To use this application you'll need to connect your Spotify
                    account! Click the button below to do so :-)
                </p>
                <a type="button" href={link} className="btn btn-primary">
                    Authorize Spotify
                </a>
            </div>
        </div>
    )
}

export default SpotifyAuth
