import { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import { AuthContext } from '../firebase/Auth'
import { SpotifyContext } from '../functions/Spotify'

function Home(props) {
    const { currentUser } = useContext(AuthContext)
    const { accessToken } = useContext(SpotifyContext)

    const [user, setUser] = useState(null)
    const [spotifyAccessToken, setSpotifyAccessToken] = useState(null)

    /* useEffect to obtain current user */
    useEffect(() => {
        setUser(null)

        function getUserData() {setTimeout( async () => {
            try {
                const { data } = await axios.get(
                    `http://${window.location.hostname}:3000/api/user/${currentUser.uid}`
                )
                console.log(data)
                setUser(data)
            } catch (e) {
                console.log(`error found : ${e}`)
            }
        }, 2000 ) };
        if (currentUser) {
            getUserData()
        }
    }, [currentUser])

    /* useEffect to obtain current spotify user */
    useEffect(() => {
        setSpotifyAccessToken(accessToken)

        // const getUserData = async () => {
        //     try {
        //         const { data } = await axios.get(
        //             `http://${window.location.hostname}:3000/api/user/${currentUser.uid}`
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
    }, [accessToken])

    if (user) {
        return (
            <div className="main">
                <p>Welcome, {user.displayName}</p>
                <p>Connecting world of music.....</p>
            </div>
        )
    } else {
        return (
            <div className="main">
                <p>Connecting world of music.....</p>
            </div>
        )
    }
}

export default Home
