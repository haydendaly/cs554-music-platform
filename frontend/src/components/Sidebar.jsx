import React, { useContext } from 'react'
import { AuthContext } from '../firebase/Auth'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import {
    faMusic,
    faHome,
    faUser,
    faPlus,
    faList,
    faSearch,
    faSignInAlt,
    faUserPlus,
    faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'

import { useWindowDimensions } from '../functions/dimensions'

import { doSignOut } from '../firebase/FirebaseFunctions'

const SideBar = () => {
    const { width } = useWindowDimensions()
    const { currentUser } = useContext(AuthContext)
    let body = null

    if (currentUser) {
        body = (
            <div
                className="sidenav shadow"
                style={width <= 1400 ? { width: 55 } : {}}
            >
                <div className="header">
                    <Icon icon={faMusic} color="#fff" size="large" />
                    {width > 1400 && <h1 className="header-text">SongShare</h1>}
                </div>
                <div className="menu-row">
                    <Link to="/post">
                        <Icon icon={faHome} className="menu-icon" />
                    </Link>
                    {width > 1400 && (
                        <Link to="/post" className="menu-text">
                            About
                        </Link>
                    )}
                </div>
                <div className="menu-row">
                    <Link to="/usershowprofile">
                        <Icon icon={faUser} className="menu-icon" />
                    </Link>
                    {width > 1400 && (
                        <Link to="/usershowprofile" className="menu-text">
                            User Profile
                        </Link>
                    )}
                </div>
                <div className="menu-row">
                    <Link to="/post/create">
                        <Icon icon={faPlus} className="menu-icon" />
                    </Link>
                    {width > 1400 && (
                        <Link to="/post/create" className="menu-text">
                            Add Post
                        </Link>
                    )}
                </div>
                <div className="menu-row">
                    <Link to="/playList">
                        <Icon icon={faList} className="menu-icon" />
                    </Link>
                    {width > 1400 && (
                        <Link to="/playList" className="menu-text">
                            Play By Album
                        </Link>
                    )}
                </div>
                <div className="menu-row">
                    <Link to="/searchTracks">
                        <Icon icon={faSearch} className="menu-icon" />
                    </Link>
                    {width > 1400 && (
                        <Link to="/searchTracks" className="menu-text">
                            Search Tracks
                        </Link>
                    )}
                </div>
                <div className="menu-row">
                    <Link to="/artistPlayList">
                        <Icon icon={faSearch} className="menu-icon" />
                    </Link>
                    {width > 1400 && (
                        <Link to="/artistPlayList" className="menu-text">
                            Play By Artist
                        </Link>
                    )}
                </div>

                <div className="menu-row">
                    <Link to="#">
                        <Icon
                            icon={faSignOutAlt}
                            className="menu-icon"
                            onClick={doSignOut}
                        />
                    </Link>

                    {width > 1400 && (
                        <Link to="#" onClick={doSignOut} className="menu-text">
                            Sign Out
                        </Link>
                    )}
                </div>
            </div>
        )
    } else {
        body = (
            <div
                className="sidenav shadow"
                style={width <= 1400 ? { width: 55 } : {}}
            >
                <div className="header">
                    <Icon icon={faMusic} color="#fff" size="large" />
                    {width > 1400 && <h1 className="header-text">SongShare</h1>}
                </div>

                <div className="menu-row">
                    <Link to="/signin">
                        <Icon icon={faSignInAlt} className="menu-icon" />
                    </Link>
                    {width > 1400 && (
                        <Link to="/signin" className="menu-text">
                            Sign In
                        </Link>
                    )}
                </div>
                <div className="menu-row">
                    <Link to="/signup">
                        <Icon icon={faUserPlus} className="menu-icon" />
                    </Link>
                    {width > 1400 && (
                        <Link to="/signup" className="menu-text">
                            Sign Up
                        </Link>
                    )}
                </div>
            </div>
        )
    }

    return <div>{body}</div>
}

export default SideBar
