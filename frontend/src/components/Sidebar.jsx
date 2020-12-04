import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  return (
    <div className="sidenav shadow">
      <div className="header">
        <Icon icon={faMusic} color="#fff" size="large" />
        <h1 className="header-text">SongShare</h1>
      </div>
      <Link to="/post">About</Link>
      <Link to="/usershowprofile">User Profile</Link>
      <Link to="/post/create">Add Post</Link>
      <Link to="/playList">Playlist</Link>
      <Link to="/playListbyLove">Love Songs</Link>
    </div>
  );
};

export default SideBar;
