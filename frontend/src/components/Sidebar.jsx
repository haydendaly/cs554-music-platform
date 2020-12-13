import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import {
    faMusic,
    faHome,
    faUser,
    faPlus,
    faList,
    faSearch,
} from '@fortawesome/free-solid-svg-icons'

import { useWindowDimensions } from '../functions/dimensions'

const SideBar = () => {
    const { width } = useWindowDimensions()

    return (
        <div
            className="sidenav shadow"
            style={width <= 1100 ? { width: 55 } : {}}
        >
            <div className="header">
                <Icon icon={faMusic} color="#fff" size="large" />
                {width > 1100 && <h1 className="header-text">SongShare</h1>}
            </div>
            <div className="menu-row">
                <Link to="/post">
                    <Icon icon={faHome} className="menu-icon" />
                </Link>
                {width > 1100 && (
                    <Link to="/post" className="menu-text">
                        About
                    </Link>
                )}
            </div>
            <div className="menu-row">
                <Link to="/usershowprofile">
                    <Icon icon={faUser} className="menu-icon" />
                </Link>
                {width > 1100 && (
                    <Link to="/usershowprofile" className="menu-text">
                        User Profile
                    </Link>
                )}
            </div>
            <div className="menu-row">
                <Link to="/post/create">
                    <Icon icon={faPlus} className="menu-icon" />
                </Link>
                {width > 1100 && (
                    <Link to="/post/create" className="menu-text">
                        Add Post
                    </Link>
                )}
            </div>
            <div className="menu-row">
                <Link to="/playList">
                    <Icon icon={faList} className="menu-icon" />
                </Link>
                {width > 1100 && (
                    <Link to="/playList" className="menu-text">
                        Play By Album
                    </Link>
                )}
            </div>
            <div className="menu-row">
                <Link to="/searchTracks">
                    <Icon icon={faSearch} className="menu-icon" />
                </Link>
                {width > 1100 && (
                    <Link to="/searchTracks" className="menu-text">
                        Search Tracks
                    </Link>
                )}
            </div>
            <div className="menu-row">
                <Link to="/artistPlayList">
                    <Icon icon={faSearch} className="menu-icon" />
                </Link>
                {width > 1100 && (
                    <Link to="/artistPlayList" className="menu-text">
                        Play By Artist
                    </Link>
                )}
            </div>
        </div>
    )
}

export default SideBar
