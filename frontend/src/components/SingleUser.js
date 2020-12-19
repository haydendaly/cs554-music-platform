import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

import { AuthContext } from '../firebase/Auth'

function SingleUser(props) {
    const { currentUser } = useContext(AuthContext)
    const [user, setUser] = useState(null)
    const [imgUrl, setImgUrl] = useState(null)
    const [error, setError] = useState(null)
    let body = null

    useEffect(() => {
        setUser(null)
        const getUserData = async () => {
            try {
                const { data } = await axios.get(
                    `http://${window.location.hostname}:3000/api/user/${props.match.params.id}`
                )
                setUser(data)

                setImgUrl(
                    `http://${window.location.hostname}:3000/api/user/photo/${
                        props.match.params.id
                    }?${new Date().getTime()}`
                )
            } catch (e) {
                setError('Unable to retrive data from server')
                console.log(`error found : ${e}`)
            }
        }

        if (currentUser) {
            getUserData()
        }
    }, [currentUser, props.match.params.id])

    if (user) {
        body = (
            <div className="user-main">
                <div className="card mt-3">
                    <img
                        src={imgUrl}
                        alt="avatar"
                        className="card-img-top img-circle avatar"
                    ></img>
                    <div className="card-body">
                        <p className="card-title">{user.displayName}</p>

                        <p className="content">{user.email}</p>
                        {user.country ? (
                            <p className="content">{user.country}</p>
                        ) : null}
                        {user.biography ? (
                            <div>
                                <span className="info-tag">About</span>{' '}
                                <p className="content">{user.biography}</p>
                            </div>
                        ) : null}
                        {user.websiteUrl ? (
                            <div>
                                <span className="info-tag">
                                    Personal Website
                                </span>{' '}
                                <div className="webUrl">
                                    <a
                                        className="content"
                                        href={user.websiteUrl}
                                        aria-label="Personal Website"
                                    >
                                        {user.websiteUrl}
                                    </a>
                                </div>
                            </div>
                        ) : null}

                        <ul className="social-icons">
                            {user.socialMedia.facebook === '' ? null : (
                                <li key="facebook">
                                    <a
                                        href={user.socialMedia.facebook}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Facebook Account"
                                    >
                                        <img
                                            src="/imgs/social_media_icon/Facebook.png"
                                            alt="facebook"
                                        />
                                    </a>
                                </li>
                            )}

                            {user.socialMedia.instagram === '' ? null : (
                                <li key="instagram">
                                    <a
                                        href={user.socialMedia.instagram}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Instagram Account"
                                    >
                                        <img
                                            src="/imgs/social_media_icon/Instagram.png"
                                            alt="instagram"
                                        />
                                    </a>
                                </li>
                            )}
                            {user.socialMedia.twitter === '' ? null : (
                                <li key="twitter">
                                    <a
                                        href={user.socialMedia.twitter}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Twitter Account"
                                    >
                                        <img
                                            src="/imgs/social_media_icon/Twitter.png"
                                            alt="twitter"
                                        />
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    if (currentUser && user) {
        return <div className="main">{body}</div>
    } else if (currentUser && !user) {
        return <div className="main no-login">{error}</div>
    } else {
        return <div className="main no-login">Please Login</div>
    }
}

export default SingleUser
