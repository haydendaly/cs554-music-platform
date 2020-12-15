
import React, { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { useWindowDimensions } from '../functions/dimensions'
import {Link} from 'react-router-dom';
import { set } from 'mongoose';
import { SpotifyContext } from '../functions/Spotify'

const useSidebarRight = () => {
    
    const { accessToken } = useContext(SpotifyContext)


    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [recommended, setRecommended] = useState([])
    const [open, setOpen] = useState(false)
    const { width } = useWindowDimensions()
    const [loading, setLoading] = useState(true)
    const [hasError, setHasError] = useState(null)
    const [type, setType] = useState('album')
    const [searchType, setSearchType] = useState(null)

    // const url = 'http://localhost:3000/spotify-api/search?q=king%10gizzard&type=album&market=US'
    const baseUrl = 'http://localhost:3000/spotify-api/search?q=';
    let searchData = null;
    useEffect(() => {
        // Make request for recommended songs
        setRecommended([
            {
                name: 'Maggot Brain',
                imageURL:
                    'https://images-na.ssl-images-amazon.com/images/I/71y5TTjtejL._SY355_.jpg',
                id: '123456',
            },
        ])
    }, [])


    const useAxios =(baseUrl) =>{
        const [state, setState] = useState({ data: null});
    useEffect(async() => {
        console.log(search);
        const market = 'US';
        searchData = search.split(',');
        // if(searchData[2]? market=searchData[2] : market )

        let url = baseUrl+searchData[0]+'&type='+searchData[1]+'&market='+market+'&access_token='+accessToken;
            let optQueryParams = {market: 'us'};

                await axios.get(url).then(
                    ({data}) => {
                        if(search.toLowerCase().includes('album')){
                            setResults(data.albums.items);
                           setSearchType('album');
                        }
                        else if(search.toLowerCase().includes('artist')){
                            setResults(data.artists.items);
                            setSearchType('artist');
                        }
                        else if(search.toLowerCase().includes('playlist')){
                            setResults(data.playlists.items);
                            setSearchType('playlist')
                        }
                        else if(search.toLowerCase().includes('track')){
                            setResults(data.tracks.items);
                            setSearchType('track')
                        }
            
        }).catch(err => {
            console.log(err);
            setHasError(err);

        })},[search]
    );

    return state;
}

let {songData} = useAxios(baseUrl);

    useEffect(() => {
        if (width >= 1100) {
            setOpen(false)
        }
    }, [width])

    return {
        search,
        setSearch,
        results,
        recommended,
        open,
        setOpen,
        width,
        searchType
    }
}

const Song = (props) => {
    const { data } = props
    const { value } = props
console.log(value)

if(value && value == 'album'){
    return(
        <div className="song">
        <Link to={`/playList/${data.id}`}>{data.name}</Link>
        </div>
    
    )}
    else if(value && value == 'artist'){
        return(
            <div className="song">
            <Link to={`/playByArtist/${data.id}`}>{data.name}</Link>
            </div>
        
        )}
        else if(value && value == 'track'){
            return(
                <div className="song">
                <Link to={`/playByTrack/${data.id}`}>{data.name}</Link>
                </div>
            
            )}
            else if(value && value == 'playlist'){
                return(
                    <div className="song">
                    <Link to={`/playByPlayList/${data.id}`}>{data.name}</Link>
                    </div>
                
                )}
    else{
        return(
            <div className="song">
            <Link to={`/playList/${data.id}`}>{data.name}</Link>
            </div>
        )
    }
    
}

const SideBarRight = () => {
    const {
        search,
        setSearch,
        results,
        recommended,
        open,
        setOpen,
        width,
searchType,
hasError
    } = useSidebarRight()
    
return (
        <div
            className="sidenav-right shadow"
            style={width > 1100 || open ? {} : { width: 55 }}
        >
            {width > 1100 || open ? (
                <div>
                    <div className="search">
                        <Icon
                            icon={faSearch}
                            color="#444"
                            size="medium"
                            onClick={() => setOpen(false)}
                        />
                        <input
                            className="search-input"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div>
                        {results && results.length > 0 ? (
                            <div className="search-results shadow">
                                {results.map((song) => (

                                    <Song data={song} value={searchType}/>
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
                </div>
            ) : (
                <div onClick={() => setOpen(true)}>
                    <Icon
                        icon={faSearch}
                        color="#fff"
                        size="medium"
                        style={{ marginLeft: 12 }}
                    />
                </div>
            )}
        </div>
    )
}

export default SideBarRight
