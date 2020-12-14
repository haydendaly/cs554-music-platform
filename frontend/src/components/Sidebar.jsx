import React, { useContext } from 'react'
import { AuthContext } from '../firebase/Auth'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import {
    faMusic,
    faHome,
    faUser,
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
    const location = useLocation()
    const { currentUser } = useContext(AuthContext)
    let body = null

    if (currentUser) {
        body = (
            <div
                className="sidenav shadow"
                style={width <= 1400 ? { width: 55 } : {}}
            >
                <div className="header">
                    <Icon icon={faMusic} color="#fff" />
                    {width > 1400 && <h1 className="header-text">SongShare</h1>}
                </div>
                <Link
                    to="/posts"
                    className="menu-row"
                    aria-label="Home"
                    style={
                        location.pathname === '/posts' ? { color: '#fff' } : {}
                    }
                >
                    <Icon icon={faHome} className="menu-icon" />
                    {width > 1400 && 'Home'}
                </Link>
                <Link
                    to="/profile"
                    className="menu-row"
                    aria-label="User Profile"
                    style={
                        location.pathname === '/profile'
                            ? { color: '#fff', marginLeft: 3 }
                            : { marginLeft: 3 }
                    }
                >
                    <Icon icon={faUser} className="menu-icon" />
                    {width > 1400 && 'User Profile'}
                </Link>
                <Link
                    to="/playList"
                    className="menu-row"
                    aria-label="Play By Album"
                    style={
                        location.pathname === '/playList'
                            ? { color: '#fff' }
                            : {}
                    }
                >
                    <Icon icon={faList} className="menu-icon" />
                    {width > 1400 && 'Play By Album'}
                </Link>
                <Link
                    to="/searchTracks"
                    className="menu-row"
                    aria-label="Search Tracks"
                    style={
                        location.pathname === '/searchTracks'
                            ? { color: '#fff' }
                            : {}
                    }
                >
                    <Icon icon={faSearch} className="menu-icon" />
                    {width > 1400 && 'Search Tracks'}
                </Link>
                <Link
                    to="/artistPlayList"
                    className="menu-row"
                    aria-label="Play By Artist"
                    style={
                        location.pathname === '/artistPlaylist'
                            ? { color: '#fff' }
                            : {}
                    }
                >
                    <Icon icon={faSearch} className="menu-icon" />
                    {width > 1400 && 'Play By Artist'}
                </Link>
                <Link
                    to="#"
                    className="menu-row"
                    onClick={doSignOut}
                    aria-label="Sign Out"
                >
                    <Icon icon={faSignOutAlt} className="menu-icon" />
                    {width > 1400 && 'Sign Out'}
                </Link>
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

                <Link
                    to="/signin"
                    className="menu-row"
                    aria-label="Sign In"
                    style={
                        location.pathname === '/signin' ? { color: '#fff' } : {}
                    }
                >
                    <Icon icon={faSignInAlt} className="menu-icon" />
                    {width > 1400 && 'Sign In'}
                </Link>
                <Link
                    to="/signup"
                    className="menu-row"
                    aria-label="Sign Up"
                    style={
                        location.pathname === '/signup' ? { color: '#fff' } : {}
                    }
                >
                    <Icon icon={faUserPlus} className="menu-icon" />
                    {width > 1400 && 'Sign Up'}
                </Link>
            </div>
        )
    }

    return <div>{body}</div>
}

export default SideBar
