import React from 'react'
import css from "../App.css"
const SideBar = () => {
    return(
    <div class="sidenav">
    <a href="/post">About</a>
    <a href="/post">User Profile</a>
    <a href="/post/create">Add Post</a>
    <a href="/post">Playlist</a>
    </div>
    )
    
}

export default SideBar;