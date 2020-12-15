import React, { useContext, useState, useEffect } from 'react'
import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Typography,
    makeStyles,
    Button,
    CardMedia,
    Link,
} from '@material-ui/core'
import SpotifyWebApi from 'spotify-web-api-js'
import { AuthContext } from '../firebase/Auth'
import AddPostModal from './Modals/AddPostModal'
import SearchComponent from './SearchComponent'
import ShowErrorModal from './Modals/ShowErrorModal'
import deadmau5_Image from '../img/artist-img/deadmau5.jpg'
import Keane_Image from '../img/artist-img/Keane.jpg'
import Avici_Image from '../img/artist-img/Avici.jpg'
import Elvis_Image from '../img/artist-img/Elvis.jpg'
import VariousArtist_Image from '../img/artist-img/various_artist.jpg'
import IZAL from '../img/artist-img/IZAL.jpg'
import VetustaMorla from '../img/artist-img/VetustaMorla.jpg'

let Spotify = require('spotify-web-api-js')

let spotifyApi = new SpotifyWebApi()

spotifyApi.setAccessToken(
    'BQAg9L_c09vM1ThhLGRZt-FBwcS8-vx3JyNEFB7rQ3CQnLh2WPOUk9qkksbLzsvtlig7QGOFYpCuCHLBpqZZWIXtIAjgb33v3M55De3XoIg5jnDDKfLIMORo9sBFvt5rWMw7AhWaN3GWNgGpB5Tu7DTgl8efHYtYIK1oUGxks5GwYPLq'
)

const useStyles = makeStyles({
    sidebar: {
        marginTop: '10%',
        backgroundColor: 'grey',
        maxWidth: '20%',
    },
    mainbar: {
        marginTop: '1%',
    },
    sidebarCard: {
        maxWidth: '150px !important',
        height: '150px',
        textAlign: 'center',
        borderRadius: 1,
        border: '1px solid #1e8678',
        marginBottom: '10px',
        marginTop: '10px',
        boxShadow:
            '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
        backgroundColor: 'lightblue',
    },
    card: {
        maxWidth: '100%',
        height: '100%',
        borderRadius: 5,
        border: '1px solid #1e8678',
        boxShadow:
            '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
        padding: '5px',
    },
    titleHead: {
        borderBottom: '1px solid #1e8678',
        fontWeight: 'bold',
        Color: 'black !important',
    },
    grid: {
        flexGrow: 1,
        flexDirection: 'row',
    },

    buttonClass: {
        marginLeft: '40%',
    },
    media: {
        height: '100%',
        width: '100%',
    },
    root: {
        display: 'flex',
        maxWidth: '100%',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: '50%',
    },
    errorDiv: {
        color: 'red',
    },
})

const PlayTracks = (props) => {
    const [artistData, setArtistData] = useState(null)
    const [artistId, setArtistId] = useState('43ZHCT0cAZBISjO8DG9PnE')
    const classes = useStyles()
    const [hasError, setHasError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [sharePost, setSharePost] = useState(null)
    const [showSharePostModal, setShowSharePostModal] = useState(null)
    const [searchTerm, setSearchTerm] = useState(null)
    const [searchData, setSearchData] = useState(null)
    const [errorModal, setErrorModal] = useState(false)
    const [albumid, setAlbumId] = useState(null)

    const { currentUser } = useContext(AuthContext)

    let card = null
    //1pzvBxYgT6OVwJLtHkrdQK -- Taylor Swift
    //2hDe0Ls5mVqs1XJqv7sbcM -- Enrique
    //4MzXwWMhyBbmu6hOcLVD49 -- bad Bunny
    //43ZHCT0cAZBISjO8DG9PnE -- Elvis
    //53A0W3U0s8diEn9RhXQhVz --Keane
    // 2CIMQHirSU0MQqyYHq0eOx -- "deadmau5"
    //57dN52uHvrHOxijzpIgu3E -- Various Artists
    //1vCWHaC5f2uS3yhpwWbIA6 -- "Avicii"
    //https://open.spotify.com/album/5Ouuxga807CPAs81lSloBJ?si=u9qkqNpiR2m45FkvcG4rnQ
    //"2hazSY4Ef3aB9ATXW7F5w3" -- IZAL
    //"6J6yx1t3nwIDyPXk5xa7O8" -- "6J6yx1t3nwIDyPXk5xa7O8"

    useEffect(() => {
        async function fetchData() {
            try {
                spotifyApi.getArtistAlbums(
                    artistId,
                    { country: 'us' },
                    function (err, data) {
                        if (err) {
                            console.error('Something went wrong!')
                        } else {
                            setArtistData(data.items)
                            setSearchData(null)
                            setLoading(false)
                        }
                    }
                )
            } catch (e) {
                setHasError(e.message)
                setLoading(false)
            }
        }
        fetchData()
    }, [artistId])

    useEffect(() => {
        async function searchArtist() {
            try {
                console.log(searchTerm)
                spotifyApi.searchArtists(searchTerm).then(
                    function (data) {
                        setSearchData({ data: data.artists.items })
                        setLoading(false)
                    },
                    function (err) {
                        setHasError(err)
                        setLoading(false)
                    }
                )
            } catch (e) {
                setHasError(e.message)
                setLoading(false)
            }
        }
        searchArtist()
    }, [searchTerm])

    const handleOpenshareModal = (trackDetails) => {
        setShowSharePostModal(true)
        setSharePost(trackDetails)
        setErrorModal(true)
    }

    const handleCloseModals = () => {
        setShowSharePostModal(false)
        setErrorModal(false)
    }

    const getAtristID = (id) => {
        console.log(id)
        setArtistId(id)
    }
    const searchValue = async (value) => {
        setSearchTerm(value)
    }
    const buildCard = (artist) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={artist.id}>
                <Card className={classes.card} variant="outlined">
                    <CardActionArea>
                        <CardContent>
                            <Typography
                                className={classes.titleHead}
                                gutterBottom
                                variant="h6"
                                component="h3"
                            >
                                <span>{artist.name}</span>
                                <br />
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <iframe
                        id="playSong"
                        src={'https://open.spotify.com/embed?uri=' + artist.uri}
                        width="300"
                        height="380"
                        frameBorder="0"
                        allowtransparency="true"
                        allow="encrypted-media"
                    ></iframe>
                    <div className="e-card-actions e-card-vertical">
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.buttonClass}
                            onClick={() => {
                                handleOpenshareModal(artist)
                            }}
                        >
                            share
                        </Button>
                    </div>
                </Card>
            </Grid>
        )
    }
    if (searchTerm && searchData) {
        card =
            searchData.data &&
            searchData.data.map((searhedList) => {
                return buildCard(searhedList)
            })
    } else {
        card =
            artistData &&
            artistData.map((artist) => {
                return buildCard(artist)
            })
    }

    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        )
    } else if (searchTerm && searchData.data.length <= 0) {
        return (
            <div class="main">
                <div class="row">
                    <div
                        class="col-md-3 col-sm-6 col-xs-12"
                        className={classes.sidebar}
                    >
                        <div className={classes.sidebarCard}>
                            <h4>Artist List</h4>
                            <Card variant="outlined">
                                <CardActionArea>
                                    <Link
                                        onClick={() =>
                                            getAtristID(
                                                '2CIMQHirSU0MQqyYHq0eOx'
                                            )
                                        }
                                    >
                                        <CardMedia
                                            className={classes.media}
                                            component="img"
                                            image={deadmau5_Image}
                                            title="show image"
                                        />
                                    </Link>
                                </CardActionArea>
                            </Card>
                            <br />
                            <Card variant="outlined">
                                <CardActionArea>
                                    <Link
                                        onClick={() =>
                                            getAtristID(
                                                '53A0W3U0s8diEn9RhXQhVz'
                                            )
                                        }
                                    >
                                        <CardMedia
                                            className={classes.media}
                                            component="img"
                                            image={Keane_Image}
                                            title="Paella dish"
                                        />
                                    </Link>
                                </CardActionArea>
                            </Card>
                            <br />
                            <Card variant="outlined">
                                <CardActionArea>
                                    <Link
                                        onClick={() =>
                                            getAtristID(
                                                '1vCWHaC5f2uS3yhpwWbIA6'
                                            )
                                        }
                                    >
                                        <CardMedia
                                            className={classes.media}
                                            component="img"
                                            image={Avici_Image}
                                            title="Paella dish"
                                        />
                                    </Link>
                                </CardActionArea>
                            </Card>
                            <br />
                            <Card variant="outlined">
                                <CardActionArea>
                                    <Link
                                        onClick={() =>
                                            getAtristID(
                                                '43ZHCT0cAZBISjO8DG9PnE'
                                            )
                                        }
                                    >
                                        <CardMedia
                                            className={classes.media}
                                            component="img"
                                            image={Elvis_Image}
                                            title="Paella dish"
                                        />
                                    </Link>
                                </CardActionArea>
                            </Card>
                            <br />
                            <Card variant="outlined">
                                <CardActionArea>
                                    <Link
                                        onClick={() =>
                                            getAtristID(
                                                '2hazSY4Ef3aB9ATXW7F5w3'
                                            )
                                        }
                                    >
                                        <CardMedia
                                            className={classes.media}
                                            component="img"
                                            image={IZAL}
                                            title="Paella dish"
                                        />
                                    </Link>
                                </CardActionArea>
                            </Card>
                            <br />
                            <Card variant="outlined">
                                <CardActionArea>
                                    <Link
                                        onClick={() =>
                                            getAtristID(
                                                '6J6yx1t3nwIDyPXk5xa7O8'
                                            )
                                        }
                                    >
                                        <CardMedia
                                            className={classes.media}
                                            component="img"
                                            image={VetustaMorla}
                                            title="Paella dish"
                                        />
                                    </Link>
                                </CardActionArea>
                            </Card>
                            <br />
                            <Card variant="outlined">
                                <CardActionArea>
                                    <Link
                                        onClick={() =>
                                            getAtristID(
                                                '57dN52uHvrHOxijzpIgu3E'
                                            )
                                        }
                                    >
                                        <CardMedia
                                            className={classes.media}
                                            component="img"
                                            image={VariousArtist_Image}
                                            title="Paella dish"
                                        />
                                    </Link>
                                </CardActionArea>
                            </Card>
                            <br />
                        </div>
                    </div>
                    <br />
                    <br />
                    <div class="col-md-9">
                        <div>
                            <SearchComponent
                                searchValue={searchValue}
                                searchTerm={searchTerm}
                            />
                        </div>
                        <br />
                        <div className={classes.errorDiv}>
                            "error: No result found for this search."
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div class="main">
                <div class="row">
                    <div
                        class="col-md-3 col-sm-6 col-xs-12"
                        className={classes.sidebar}
                    >
                        <div className={classes.sidebarCard}>
                            <h4>Artist List</h4>
                            <Card variant="outlined">
                                <CardActionArea>
                                    <Link
                                        onClick={() =>
                                            getAtristID(
                                                '2CIMQHirSU0MQqyYHq0eOx'
                                            )
                                        }
                                    >
                                        <CardMedia
                                            className={classes.media}
                                            component="img"
                                            image={deadmau5_Image}
                                            title="show image"
                                        />
                                    </Link>
                                </CardActionArea>
                            </Card>
                            <br />
                            <Card variant="outlined">
                                <CardActionArea>
                                    <Link
                                        onClick={() =>
                                            getAtristID(
                                                '53A0W3U0s8diEn9RhXQhVz'
                                            )
                                        }
                                    >
                                        <CardMedia
                                            className={classes.media}
                                            component="img"
                                            image={Keane_Image}
                                            title="Paella dish"
                                        />
                                    </Link>
                                </CardActionArea>
                            </Card>
                            <br />
                            <Card variant="outlined">
                                <CardActionArea>
                                    <Link
                                        onClick={() =>
                                            getAtristID(
                                                '1vCWHaC5f2uS3yhpwWbIA6'
                                            )
                                        }
                                    >
                                        <CardMedia
                                            className={classes.media}
                                            component="img"
                                            image={Avici_Image}
                                            title="Paella dish"
                                        />
                                    </Link>
                                </CardActionArea>
                            </Card>
                            <br />
                            <Card variant="outlined">
                                <CardActionArea>
                                    <Link
                                        onClick={() =>
                                            getAtristID(
                                                '43ZHCT0cAZBISjO8DG9PnE'
                                            )
                                        }
                                    >
                                        <CardMedia
                                            className={classes.media}
                                            component="img"
                                            image={Elvis_Image}
                                            title="Paella dish"
                                        />
                                    </Link>
                                </CardActionArea>
                            </Card>
                            <br />
                            <Card variant="outlined">
                                <CardActionArea>
                                    <Link
                                        onClick={() =>
                                            getAtristID(
                                                '2hazSY4Ef3aB9ATXW7F5w3'
                                            )
                                        }
                                    >
                                        <CardMedia
                                            className={classes.media}
                                            component="img"
                                            image={IZAL}
                                            title="Paella dish"
                                        />
                                    </Link>
                                </CardActionArea>
                            </Card>
                            <br />
                            <Card variant="outlined">
                                <CardActionArea>
                                    <Link
                                        onClick={() =>
                                            getAtristID(
                                                '6J6yx1t3nwIDyPXk5xa7O8'
                                            )
                                        }
                                    >
                                        <CardMedia
                                            className={classes.media}
                                            component="img"
                                            image={VetustaMorla}
                                            title="Paella dish"
                                        />
                                    </Link>
                                </CardActionArea>
                            </Card>
                            <br />
                            <Card variant="outlined">
                                <CardActionArea>
                                    <Link
                                        onClick={() =>
                                            getAtristID(
                                                '57dN52uHvrHOxijzpIgu3E'
                                            )
                                        }
                                    >
                                        <CardMedia
                                            className={classes.media}
                                            component="img"
                                            image={VariousArtist_Image}
                                            title="Paella dish"
                                        />
                                    </Link>
                                </CardActionArea>
                            </Card>
                            <br />
                        </div>
                    </div>
                    <br />
                    <br />
                    <div class="col-md-9">
                        <div>
                            <SearchComponent
                                searchValue={searchValue}
                                searchTerm={searchTerm}
                            />
                        </div>
                        <div>
                            <Grid
                                container
                                className={classes.grid}
                                className={classes.mainbar}
                                spacing={5}
                            >
                                {card}
                            </Grid>
                        </div>
                    </div>
                </div>

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
            </div>
        )
    }
}

export default PlayTracks
