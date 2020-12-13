import React, { useEffect, useState, createContext } from 'react'
import SpotifyAuth from '../components/SpotifyAuth'
import qs from 'qs'
import _ from 'lodash'
import axios from 'axios'

const SpotifyContext = createContext()

const client_id = 'd1f357b5e08e444682e89704869b769c' // Your client id
const client_secret = '898b527f70c84fa0b09d45bfbdbb4635' // Your secret
const redirect_uri = 'http://localhost:8000/spotify' // Your redirect uri

export const SpotifyProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')
    const [spotifyCode, setSpotifyCode] = useState(
        /*localStorage.getItem('code') ||*/ ''
    )

    /* useEffect to determine if code exists in local storage to bypass need to reauthorize */
    // useEffect(() => {
    //     if (refreshToken !== "") {
    //         console.log(refreshToken);
    //     }
    // }, [])

    /* Make query to Spotify */
    const getTokens = async (code) => {
        console.log('code: ', code)
        const bodyqs = qs.stringify({
            code,
            redirect_uri,
            grant_type: 'authorization_code',
        })

        const request = {
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                Authorization:
                    'Basic ' +
                    new Buffer(client_id + ':' + client_secret).toString(
                        'base64'
                    ),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: bodyqs,
        }
        const data = await axios(request)
        console.log(data)
        setAccessToken(data.access_token)
        setRefreshToken(data.refresh_token)
    }

    useEffect(() => {
        const queries = qs.parse(window.location.search, {
            ignoreQueryPrefix: true,
        })
        if (_.has(queries, 'code')) {
            const { code } = queries
            setSpotifyCode(code)
        }
    }, [window.location.search])

    /* useEffect to Parse Redirect Back From Spotify*/
    useEffect(() => {
        if (spotifyCode !== '') {
            getTokens(spotifyCode)
        }
    }, [spotifyCode])

    return accessToken === '' ? (
        <SpotifyAuth setAccessToken={setAccessToken} />
    ) : (
        <SpotifyContext.Provider value={{ accessToken }}>
            {children}
        </SpotifyContext.Provider>
    )
}
