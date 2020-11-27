import React from 'react'
import css from "../App.css"
const SideBar = () => {
    return(
    <div class="sidenav">
    <a href="/post">About</a>
    <a href="/post">User Profile</a>
    <a href="/post/create">Add Post</a>
    <a href="/playList">Playlist</a>
    <a href="/playListbyLove">Love Songs</a>
    </div>
    )
    
}

export default SideBar;