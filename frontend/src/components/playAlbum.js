import React, { useContext, useState, useEffect } from 'react'
import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Typography,
    makeStyles,
    Button,
    Link,
    CardMedia,
} from '@material-ui/core'
import SpotifyWebApi from 'spotify-web-api-js'
import { AuthContext } from '../firebase/Auth'
import AddPostModal from './Modals/AddPostModal'
import Legends_Never_Die from '../img/artist-img/Legends_Never_Die.jpg'
import taylorswift from '../img/artist-img/taylorswift.jpg'
import The_Goat from '../img/artist-img/The_Goat.webp'
import After_Hours from '../img/artist-img/After_Hours.jpg'
import folklore from '../img/artist-img/folklore.jpg'
import No_Image from '../img/artist-img/No_Image.jpeg'
import Euphoria from '../img/artist-img/Euphoria.jpg'
import ShowErrorModal from './Modals/ShowErrorModal'

let Spotify = require('spotify-web-api-js')
// var s = new Spotify();

let spotifyApi = new SpotifyWebApi()

spotifyApi.setAccessToken(
    'BQC2_U99dHI9wVjzAPhqRhRbRZDCanzT8CFetZAajMA_qPQxI-kVTum90y7dHRkADr90jl-_HEK6rk1fmeIJPhL2w-R44GZwG4nslxfq3x_gz1P08NI9fdTGAcNxmah3nd75cObZDx-mGMfoQixV_fZ-q9voMt-oXwbAKkvd1oEiMnWw'
)

const useStyles = makeStyles({
    sidebarCard: {
        maxWidth: '100%',
        height: '100%',
        marginTop: '12px',
    },
    card: {
        maxWidth: 350,
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        border: '1px solid #1e8678',
        boxShadow:
            '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
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
    modal: {
        top: '50%',
        left: '20%',
        right: 'auto',
        // bottom: '90%',
        marginRight: '50%',
        transform: 'translate(10%, -50%)',
        width: '50%',
        // border: '1px solid #28547a',
        borderRadius: '4px',
        float: 'left',
        // background:'lightblue'
    },

    textFieldStyle: {
        left: '.5%',
        right: '.5%',
        top: '.5%',
        bottom: '25%',
        width: '90%',
        margin: 'auto',
        background: 'white',
    },

    buttonClass: {
        marginLeft: '40%',
    },
})

const PlayAlbum = (props) => {
    const [albumData, setAlbumtData] = useState(undefined)
    const classes = useStyles()
    const [hasError, setHasError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [sharePost, setSharePost] = useState(null)
    const [showSharePostModal, setShowSharePostModal] = useState(null)
    const [albumId, setAlbumId] = useState('12HeDZhPHHzCe7VE0uEYwD')
    const [errorModal, setErrorModal] = useState(false)

    let card = null

    const { currentUser } = useContext(AuthContext)
    useEffect(() => {
        console.log('on load useeffect')
        async function fetchData() {
            try {
                spotifyApi.getAlbum(albumId).then(
                    function (data) {
                        setAlbumtData(data.tracks.items)
                        setLoading(false)
                    },
                    function (err) {
                        setHasError(err)
                    }
                )
            } catch (e) {
                setHasError(e.message)
            }
        }
        fetchData()
    }, [albumId])

    const handleOpenshareModal = (trackDetails) => {
        setShowSharePostModal(true)
        setSharePost(trackDetails)
        setErrorModal(true)
        console.log(trackDetails)
    }

    const handleCloseModals = () => {
        setShowSharePostModal(false)
        setErrorModal(false)
    }

    const getAlbumID = (id) => {
        setAlbumId(id)
    }

    const buildCard = (album) => {
        return (
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={album.id}>
                <Card className={classes.card} variant="outlined">
                    <CardActionArea>
                        <CardContent>
                            <Typography
                                className={classes.titleHead}
                                gutterBottom
                                variant="h6"
                                component="h3"
                            >
                                <span>{album.name}</span>
                                <br />
                                <span>Track Number: {album.track_number}</span>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <iframe
                        id="playSong"
                        src={'https://open.spotify.com/embed?uri=' + album.uri}
                        width="300"
                        height="380"
                        frameborder="0"
                        allowtransparency="true"
                        allow="encrypted-media"
                    ></iframe>
                    <div className="e-card-actions e-card-vertical">
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.buttonClass}
                            onClick={() => {
                                handleOpenshareModal(album)
                            }}
                        >
                            share
                        </Button>
                    </div>
                </Card>
            </Grid>
        )
    }
    if (albumData) {
        console.log(albumData)
        card =
            albumData &&
            albumData.map((album) => {
                return buildCard(album)
            })
    }

    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        )
    }
    if (hasError) {
        return <div>{hasError}</div>
    } else {
        return (
            <div class="main">
                <div class="row">
                    <div
                        class="col-md-3 col-sm-6 col-xs-12"
                        className={classes.sidebar}
                    >
                        <div className={classes.sidebarCard}>
                            <h4>Popular Albums</h4>
                            <Card variant="outlined">
                                <CardActionArea>
                                    <Link
                                        onClick={() =>
                                            getAlbumID('12HeDZhPHHzCe7VE0uEYwD')
                                        }
                                    >
                                        <CardMedia
                                            className={classes.media}
                                            component="img"
                                            image={Euphoria}
                                            title=" "
                                        />
                                    </Link>
                                </CardActionArea>
                            </Card>
                            <br />
                            <Card variant="outlined ">
                                <CardActionArea>
                                    <Link
                                        onClick={() =>
                                            getAlbumID('6n9DKpOxwifT5hOXtgLZSL')
                                        }
                                    >
                                        <CardMedia
                                            className={classes.media}
                                            component="img"
                                            image={Legends_Never_Die}
                                            title="Ledends Never Die"
                                        />
                                    </Link>
                                </CardActionArea>
                            </Card>
                            <br />
                            <Card variant="outlined">
                                <CardActionArea>
                                    <Link
                                        onClick={() =>
                                            getAlbumID('39xhYyNNDatQtgKw2KdXMz')
                                        }
                                    >
                                        <CardMedia
                                            className={classes.media}
                                            component="img"
                                            image={The_Goat}
                                            title="The Goat"
                                        />
                                    </Link>
                                </CardActionArea>
                            </Card>
                            <br />
                            <Card variant="outlined">
                                <CardActionArea>
                                    <Link
                                        onClick={() =>
                                            getAlbumID('3YjfdLdpQcVI72uKhooZst')
                                        }
                                    >
                                        <CardMedia
                                            className={classes.media}
                                            component="img"
                                            image={No_Image}
                                            title="F*Ck LOVE(SAVAGE)"
                                        />
                                    </Link>
                                </CardActionArea>
                            </Card>
                            <br />
                            <Card variant="outlined">
                                <CardActionArea>
                                    <Link
                                        onClick={() =>
                                            getAlbumID('2fenSS68JI1h4Fo296JfGr')
                                        }
                                    >
                                        <CardMedia
                                            className={classes.media}
                                            component="img"
                                            image={folklore}
                                            title="folklore"
                                        />
                                    </Link>
                                </CardActionArea>
                            </Card>
                            <br />
                            <Card variant="outlined">
                                <CardActionArea>
                                    <Link
                                        onClick={() =>
                                            getAlbumID('4yP0hdKOZPNshxUOjY0cZj')
                                        }
                                    >
                                        <CardMedia
                                            className={classes.media}
                                            component="img"
                                            image={After_Hours}
                                            title="After Hours"
                                        />
                                    </Link>
                                </CardActionArea>
                            </Card>
                            <br />
                            <br />
                        </div>
                    </div>
                    <br />
                    <br />
                    <div class="col-md-9">
                        <Grid container className={classes.grid} spacing={5}>
                            {card}
                        </Grid>
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

export default PlayAlbum
