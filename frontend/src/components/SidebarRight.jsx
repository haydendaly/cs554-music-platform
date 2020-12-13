import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { useWindowDimensions } from '../functions/dimensions'

const useSidebarRight = () => {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [recommended, setRecommended] = useState([])
    const [open, setOpen] = useState(false)
    const { width } = useWindowDimensions()

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

    useEffect(() => {
        // Search Spotify API
        setResults([])
    }, [search])

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
            <p>{data.name}</p>
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
