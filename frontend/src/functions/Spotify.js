import React, { useEffect, useState, createContext, useContext } from 'react'
import SpotifyAuth from '../components/SpotifyAuth'
import qs from 'qs'
import _ from 'lodash'
import axios from 'axios'
import { AuthContext } from '../firebase/Auth'

export const SpotifyContext = createContext()

const client_id = 'd1f357b5e08e444682e89704869b769c' // Your client id
const client_secret = '898b527f70c84fa0b09d45bfbdbb4635' // Your secret
const redirect_uri = 'http://localhost:8000/spotify' // Your redirect uri

export const SpotifyProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext)
    // const [user, setUser] = useState(null)

    const [isSpotifyAuthed, setIsSpotifyAuthed] = useState(false)
    const [accessToken, setAccessToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')
    const [spotifyCode, setSpotifyCode] = useState(
        /*localStorage.getItem('code') ||*/ ''
    )

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
        const { access_token, refresh_token } = data.data
        console.log('accesstoken: ', access_token)

        console.log('current user!:', currentUser.uid)

        // Store refresh_token in redis cache using the backend route
        await axios
            .post(
                `http://localhost:3000/refreshToken/set/${currentUser.uid}?refresh_token=${refresh_token}`
            )
            .then((error) => {
                console.log(error)
            })

        setAccessToken(access_token)
        // isRefreshTokenCached();
    }

    const refreshAccessToken = async () => {
        const bodyqs = qs.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
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
        setAccessToken(data.access_token)
    }

    // data is returned as {exists: false} OR {exists: true, refresh_token=123}
    const getRefreshTokenFromCache = async () => {
        console.log('isRefreshTokenCached fired')
        const cachedData = await axios.get(
            `http://localhost:3000/refreshToken/get/${currentUser.uid}`
        )
        return cachedData.data
    }

    /* useEffect to determine if code exists in the redis cache to bypass need to reauthorize */
    useEffect(() => {
        console.log('base useEffect fired')
        console.log(getRefreshTokenFromCache())
        const data = getRefreshTokenFromCache()
        let exists = data.exists
        let refresh_token = data.refresh_token
        console.log('exists???? ', exists)
        console.log('refresh token from cache: ', refresh_token)
        if (exists) {
            setRefreshToken(refresh_token)
            setIsSpotifyAuthed(true)
        } else {
            setIsSpotifyAuthed(false)
        }
    }, [])

    useEffect(() => {
        console.log('isSpotifyAuthed useEffect fired')
        if (isSpotifyAuthed) {
            refreshAccessToken()
        }
    }, [isSpotifyAuthed])

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
