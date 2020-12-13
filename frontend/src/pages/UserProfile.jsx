import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from '../firebase/Auth'

function UserProfile(props) {
    const { currentUser } = useContext(AuthContext)

    const [user, setUser] = useState(null)

    const [selectedFile, setSelectedFile] = useState(null)
    const [imgUrl, setImgUrl] = useState(null)

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

                setImgUrl(
                    `http://localhost:3000/api/user/photo/${
                        currentUser.uid
                    }?${new Date().getTime()}`
                )
            } catch (e) {
                console.log(`error found : ${e}`)
            }
        }
        console.log(currentUser)
        if (currentUser) {
            getUserData()
        }
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

    const fileSelectHandler = (e) => {
        console.log(e.target.files[0])
        setSelectedFile(e.target.files[0])
    }

    const fileUploadHandler = async () => {
        try {
            let formData = new FormData()
            formData.append('image', selectedFile, selectedFile.name)
            const success = await axios.post(
                `http://localhost:3000/api/user/photo/${currentUser.uid}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            console.log(success)
            alert('Profile Picture Updated!')
            setImgUrl(
                `http://localhost:3000/api/user/photo/${
                    currentUser.uid
                }?${new Date().getTime()}`
            ) // force page re-render
        } catch (e) {
            console.log(e)
        }
    }

    let body = null

    if (user && props.page === 'ShowProfile') {
        body = (
            <div>
                <div className="card mt-3">
                    <img
                        src={imgUrl}
                        alt="avatar"
                        className="card-img-top img-circle avatar"
                    ></img>
                    <div className="card-body">
                        <h5 className="card-title">{user.displayName}</h5>

                        <p className="card-title">{user.email}</p>
                        {user.country ? (
                            <p className="card-title">{user.country}</p>
                        ) : null}
                        {user.biography ? (
                            <div>
                                <span className="info-tag">About</span>{' '}
                                <p>{user.biography}</p>
                            </div>
                        ) : null}
                        {user.websiteUrl ? (
                            <div>
                                <span className="info-tag">
                                    Personal Website
                                </span>{' '}
                                <p>{user.websiteUrl}</p>
                            </div>
                        ) : null}

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

                        <div className="card-title">
                            <a
                                className="edit-button card-title"
                                href="/usereditprofile"
                            >
                                <i className="fas fa-user-edit"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (user && props.page === 'EditProfile') {
        body = (
            <div>
                <div className="container">
                    <div className="row mt-3">
                        <div className="col col-sm-4">
                            <div className="user-img">
                                <img
                                    src={imgUrl}
                                    alt="avatar"
                                    className="avatar img-circle avatar-lg"
                                    width="150px"
                                ></img>
                            </div>
                            <div className="img-upload">
                                <input
                                    type="file"
                                    onChange={fileSelectHandler}
                                    className="input-file"
                                />
                                <br />
                                <button
                                    className="btn btn-light"
                                    onClick={fileUploadHandler}
                                >
                                    Upload
                                </button>
                            </div>
                        </div>
                        <div className="col">
                            <div className="edit-profile">
                                <form onSubmit={submitForm}>
                                    <div className="form-group">
                                        <label>
                                            Name
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
                                            Email
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
                                            Personal Website
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
                                            Facebook
                                            <input
                                                className="form-control"
                                                name="facebook"
                                                id="facebook"
                                                type="url"
                                                defaultValue={
                                                    user.socialMedia.facebook
                                                }
                                            />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Instagram
                                            <input
                                                className="form-control"
                                                name="instagram"
                                                id="instagram"
                                                type="url"
                                                defaultValue={
                                                    user.socialMedia.instagram
                                                }
                                            />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Twitter
                                            <input
                                                className="form-control"
                                                name="twitter"
                                                id="twitter"
                                                type="url"
                                                defaultValue={
                                                    user.socialMedia.twitter
                                                }
                                            />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            About
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

                                    <button
                                        className="btn btn-light"
                                        type="submit"
                                    >
                                        Update Profile
                                    </button>
                                </form>
                                <br />
                                <a href="/usershowprofile">
                                    Back To My Profile
                                </a>
                                <br />
                                <a href="/userupdatepassword">
                                    Change Password
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (user) {
        return <div className="main">{body}</div>
    } else {
        return <div>Please Login</div>
    }
}

export default UserProfile
