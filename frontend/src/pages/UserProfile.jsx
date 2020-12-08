import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from '../firebase/Auth'

function UserProfile(props) {
    const { currentUser } = useContext(AuthContext)

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    /***
     * Render current user
     */
    useEffect(() => {
        const getUserData = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:3000/api/user/${currentUser.uid}`
                )
                console.log(data)
                setUser(data)
                setLoading(false)
            } catch (e) {
                console.log(`error found : ${e}`)
            }
        }
        getUserData()
    }, [currentUser])

    const submitForm = async (e) => {
        e.preventDefault()
        const {
            displayName,
            websiteUrl,
            facebook,
            instagram,
            twitter,
            biography,
        } = e.target.elements

        const updateData = {
            displayName: displayName.value,
            websiteUrl: websiteUrl.value,
            socialMedia: {
                facebook: facebook.value,
                instagram: instagram.value,
                twitter: twitter.value,
            },
            biography: biography.value,
        }
        console.log(updateData)
        try {
            const { data } = await axios.patch(
                `http://localhost:3000/api/user/${user._id}`,
                updateData
            )
            setUser(data)
            alert('Profile has been updated')
        } catch (error) {
            console.log(error)
            alert(`Unable to update user: ${e}`)
        }
    }

    let body = null

    if (user && props.page === 'ShowProfile') {
        body = (
            <div>
                <p>Display Name: {user.displayName}</p>
                <p>Email: {user.email}</p>
                <p>Gender: {user.gender}</p>
                <p>Biography: {user.biography}</p>
                <p>Personal Website: {user.websiteUrl}</p>
                <p>Country: {user.country}</p>
                <ul className="social-icons">
                    {user.socialMedia.facebook === '' ? null : (
                        <li key="facebook">
                            <a
                                href={user.socialMedia.facebook}
                                target="_blank"
                                rel="noreferrer"
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
                            >
                                <img
                                    src="/imgs/social_media_icon/Twitter.png"
                                    alt="twitter"
                                />
                            </a>
                        </li>
                    )}
                </ul>

                <a className="btn btn-primary" href="/usereditprofile">
                    Edit Profile
                </a>
                <br />
                <a className="btn btn-primary" href="/userupdatepassword">
                    Change Password
                </a>
            </div>
        )
    } else if (user && props.page === 'EditProfile') {
        body = (
            <div>
                <form onSubmit={submitForm}>
                    <div className="form-group">
                        <label>
                            Display Name:
                            <input
                                className="form-control"
                                name="displayName"
                                id="displayName"
                                type="text"
                                defaultValue={user.displayName}
                                required
                            />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            Email:
                            <input
                                className="form-control"
                                name="email"
                                id="email"
                                type="text"
                                readOnly
                                value={user.email}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Personal Website:
                            <input
                                className="form-control"
                                name="websiteUrl"
                                id="websiteUrl"
                                type="url"
                                defaultValue={user.websiteUrl}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Facebook:
                            <input
                                className="form-control"
                                name="facebook"
                                id="facebook"
                                type="url"
                                defaultValue={user.socialMedia.facebook}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Instagram:
                            <input
                                className="form-control"
                                name="instagram"
                                id="instagram"
                                type="url"
                                defaultValue={user.socialMedia.instagram}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Twitter:
                            <input
                                className="form-control"
                                name="twitter"
                                id="twitter"
                                type="url"
                                defaultValue={user.socialMedia.twitter}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Biography:
                            <textarea
                                className="form-control"
                                name="biography"
                                id="biography"
                                type="text"
                                rows="3"
                                defaultValue={user.biography}
                            />
                        </label>
                    </div>

                    <button className="btn btn-primary" type="submit">
                        Update Profile
                    </button>
                </form>
                <br />
                <a className="btn btn-primary" href="/usershowprofile">
                    Back To My Profile
                </a>
            </div>
        )
    }

    if (user) {
        return <div className="main">{body}</div>
    } else if (loading) {
        return <div>Loading</div>
    }
}

export default UserProfile
