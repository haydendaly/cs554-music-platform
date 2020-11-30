import React, { useState, useEffect } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const useSidebarRight = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    // Make request for recommended songs
    setRecommended([
      {
        name: "Maggot Brain",
        imageURL:
          "https://images-na.ssl-images-amazon.com/images/I/71y5TTjtejL._SY355_.jpg",
        id: "123456",
      },
    ]);
  }, []);

  useEffect(() => {
    // Search Spotify API
    setResults([]);
  }, [search]);

  return {
    search,
    setSearch,
    results,
    recommended,
  };
};

const Song = (props) => {
  const { data } = props;

  return (
    <div className="song">
      <p>{data.name}</p>
    </div>
  );
};

const SideBarRight = () => {
  const { search, setSearch, results, recommended } = useSidebarRight();
  return (
    <div className="sidenav-right shadow">
      <div className="search">
        <Icon icon={faSearch} color="#444" size="medium" />
        <input
          className="search-input"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {search.length > 0 ? (
        <div className="search-results shadow">
          {results.map((song) => (
            <Song data={song} />
          ))}
        </div>
      ) : (
        <div className="recommended shadow">
          {recommended.map((song) => (
            <Song data={song} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SideBarRight;
