import { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import { AuthContext } from '../firebase/Auth'
import { SpotifyContext } from '../functions/Spotify'

function Home(props) {
    const { currentUser } = useContext(AuthContext)
    const { currentSpotifyUser } = useContext(SpotifyContext)

    const [user, setUser] = useState(null)
    const [spotifyAccessToken, setSpotifyAccessToken] = useState(null)

    /* useEffect to obtain current user */
    useEffect(() => {
        console.log('useEffect fired')
        setUser(null)

        const getUserData = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:3000/api/user/${currentUser.uid}`
                )
                console.log(data)
                setUser(data)
            } catch (e) {
                console.log(`error found : ${e}`)
            }
        }
        console.log(currentUser)
        if (currentUser) {
            getUserData()
        }
    }, [currentUser])

    /* useEffect to obtain current spotify user */
    useEffect(() => {
        console.log('useEffect fired')
        console.log('currentspotifyuser: ', currentSpotifyUser)
        setSpotifyAccessToken(null)

        // const getUserData = async () => {
        //     try {
        //         const { data } = await axios.get(
        //             `http://localhost:3000/api/user/${currentUser.uid}`
        //         )
        //         console.log(data)
        //         setUser(data)
        //     } catch (e) {
        //         console.log(`error found : ${e}`)
        //     }
        // }
        // console.log(currentUser)
        // if (currentSpotifyUser) {
        //     getUserData()
        // }
    }, [currentSpotifyUser])

    if (user) {
        return (
            <div class="main">
                <p>Welcome, {user.displayName}</p>
                <p>Connecting world of music.....</p>
            </div>
        )
    } else {
        return (
            <div class="main">
                <p>Connecting world of music.....</p>
            </div>
        )
    }
}

export default Home
