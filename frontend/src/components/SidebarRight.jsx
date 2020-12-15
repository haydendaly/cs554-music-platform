
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { useWindowDimensions } from '../functions/dimensions'
import {Link} from 'react-router-dom';
import { set } from 'mongoose';


const useSidebarRight = () => {
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

        let url = baseUrl+searchData[0]+'&type='+searchData[1]+'&market='+market;
            let optQueryParams = {market: 'us'};
                await axios.get(url).then(
                    ({data}) => {
                        if(search.toLowerCase().includes('album')){
                            setResults(data.albums.items);
                           setSearchType('album');
                        }
                        else if(search.toLowerCase().includes('artist')){
                            setResults(data.artists.items);
                            console.log(data.artists.items);
                            setSearchType('artist');
                        }
                        else if(searchData[1].toLowerCase() === 'playlist'){
                            setResults(data.playlists.items);
                            console.log(data.playlists.items);
                        }
                        else if(searchData[1].toLowerCase() === 'track'){
                            setResults(data.tracks.items);
                            console.log(data.tracks.items);
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
        if (width >= 1400) {
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
    }
}

const Song = (props) => {
    const { data } = props
    return (
        <div className="song">
        <Link to={`/playList/${data.id}`}>{data.name}</Link>
        </div>
    )
    
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
searchType
    } = useSidebarRight()

    return (
        <div
            className="sidenav-right shadow"
            style={width > 1400 || open ? {} : { width: 55 }}
        >
            {width > 1400 || open ? (
                <div>
                    <div className="search">
                        <Icon
                            icon={faSearch}
                            color="#444"
                            onClick={() => setOpen(false)}
                        />
                        <label htmlFor="search-all" />
                        <input
                            id="search-all"
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

                                    <Song data={song}/>
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
                        style={{ marginLeft: 12 }}
                    />
                </div>
            )}
        </div>
    )
}

export default SideBarRight
