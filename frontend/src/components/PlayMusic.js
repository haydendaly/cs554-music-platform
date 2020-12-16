import React, { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useWindowDimensions } from '../functions/dimensions'
import { Link } from 'react-router-dom'
import { SpotifyContext } from '../functions/Spotify'
import Nav from 'react-bootstrap/Nav'
import { AuthContext } from '../firebase/Auth'
import AddPostModal from './Modals/AddPostModal'
import ShowErrorModal from './Modals/ShowErrorModal'

import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Typography,
    makeStyles,
    Button,
} from '@material-ui/core'

const types = ['album', 'artist', 'playlist', 'track']

const useStyles = makeStyles({
    card: {
        marginBottom: "5%",
        width : "100%",
        height: '100%',
        borderRadius: 5,
        border: '1px solid #1e8678',
        boxShadow:
            '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
    },
    titleHead: {
        fontWeight: 'bold',
        Color: 'black !important',
    },
    grid: {
        flexGrow: 1,
        flexDirection: 'row',
    },
})



const UsePlayMusic = () => {

    const { accessToken } = useContext(SpotifyContext)
    const classes = useStyles()
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const { width } = useWindowDimensions()
    const [hasError, setHasError] = useState(null)
    const [searchType, setSearchType] = useState(null)

    const baseUrl = `http://${window.location.hostname}:3000/spotify-api/search?q=`

    useEffect(() => {
        const value = search === '' ? "A" : search
        console.log(`searchtype = ${searchType}`)

        const url =
            baseUrl +
            value
                .toLowerCase()
                .split(' ')
                .filter((word) => !types.includes(word))
                .join(' ') +
            '&type=track,album,playlist,artist&market=US&access_token=' +
            accessToken
        
            axios
                .get(url)
                .then(({ data }) => {
                    console.log(data)
                    if (searchType === 'album') {
                        setResults(data.albums.items)
                    } else if (searchType === 'artist') {
                        setResults(data.artists.items)
                    } else if (searchType === 'playlist') {
                        setResults(data.playlists.items)
                    } else if (searchType === 'track') {
                        setResults(data.tracks.items)
                    } else {
                        let res = data.playlists.items || []
                        res = res.concat(data.artists.items || [])
                        res = res.concat(data.albums.items || [])
                        res = res.concat(data.tracks.items || [])
                        setResults(res)
                        setSearchType('all')
                    }
                })
                .catch((err) => {
                    console.log(err)
                    setHasError(err)
                })
        
    }, [search, searchType])

    return {
        search,
        setSearch,
        results,
        width,
        searchType,
        setSearchType,
        classes
    }
}



const PlayMusic = () => {
    const {
        search,
        setSearch,
        results,
        setSearchType,
        classes
    } = UsePlayMusic()
    const [sharePost, setSharePost] = useState(null)
    const [showSharePostModal, setShowSharePostModal] = useState(null)
    const [errorModal, setErrorModal] = useState(false)
    const { currentUser } = useContext(AuthContext)

    const handleSelect = (eventKey) => {
        setSearchType(eventKey)
    }

    const handleOpenshareModal = (album) => {
        console.log(album)
        setShowSharePostModal(true)
        setSharePost(album)
        setErrorModal(true)
    }

    const handleCloseModals = () => {
        setShowSharePostModal(false)
        setErrorModal(false)
    }

    const buildCard = (album) => {
        return (
                <Card className={classes.card} variant="outlined">
                    <CardActionArea>
                        <CardContent>
                        <Grid container justify="space-between">  
                            <Typography inline variant="body1" align="left" class = {classes.titleHead}>
                                <span>{album.name}</span>
                                <br />
                                <span>Track Number: {album.track_number}</span>
                            </Typography>
                            <Typography inline variant="body1" align="right">
                                <Button variant="contained" color="secondary" 
                                onClick={() => {
                                handleOpenshareModal(album)}}>
                                    share
                                </Button>
                            </Typography>
                        </Grid>                                                                          
                        </CardContent>
                    </CardActionArea>
                    <iframe
                        id="playSong"
                        src={'https://open.spotify.com/embed?uri=' + album.uri}
                        width="100%"
                        height="500"
                        frameBorder="0"
                        allowtransparency="true"
                        allow="encrypted-media"
                    ></iframe>
                    {currentUser
                            ? showSharePostModal && (
                                  <AddPostModal
                                      isOpen={showSharePostModal}
                                      handleClose={handleCloseModals}
                                      title={'Share Post'}
                                      data={null}
                                      currentUser={currentUser.uid}
                                      songData={sharePost}
                                      postId={null}
                                  />
                              )
                            : errorModal && (
                                  <ShowErrorModal
                                      isOpen={errorModal}
                                      handleClose={handleCloseModals}
                                      title={'Login Error'}
                                  />
                    )}
                </Card>           
        )
    }

    return(  
        <div class="main">
            <Nav variant="tabs" onSelect={handleSelect}>
            <Nav.Item>
                <Nav.Link eventKey="album" href="#album">Album </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="artist" href="#artist">Artist </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="track" href="#track">Track </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="playlist" href="#playlist"> Playlist </Nav.Link>
            </Nav.Item>            
            </Nav>


        <div className="search" style={{ width: '90%'}}>
            <Icon
                icon={faSearch}
                color="#444"
            />
            <input
                className="search-input"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>

        <br/> 
       
        {results && results.length > 0 ? (
        <div class="main">
           {results.map((song) => (                                  
                <Grid container className={classes.grid} spacing={5}>
                    {buildCard(song)}
                </Grid>                    
            ))}
        </div>
            ) : 
                <div><p> Currently no songs available </p></div>                                
        }
        </div>
    )
}

export default PlayMusic