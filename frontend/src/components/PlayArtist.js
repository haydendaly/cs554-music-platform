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

import { AuthContext } from '../firebase/Auth'
import Loading from './Loading'
import AddPostModal from './Modals/AddPostModal'
import ShowErrorModal from './Modals/ShowErrorModal'
import axios from 'axios'
import { SpotifyContext } from '../functions/Spotify'

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
        marginLeft: '20%',
        display: 'inline',
        display: 'inline-block !important',
    },
})

const PlayByArtist = (props) => {
    const { accessToken } = useContext(SpotifyContext)
    const [artistData, setArtistDataa] = useState(undefined)
    const classes = useStyles()
    const [hasError, setHasError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [sharePost, setSharePost] = useState(null)
    const [showSharePostModal, setShowSharePostModal] = useState(null)
    const [artistId, setAristId] = useState(props.match.params.id)
    const [errorModal, setErrorModal] = useState(false)
    const [topTrack, setTopTrack] = useState(null)
    const [artistAlbum, setArtistAlbum] = useState(null)

    let card = null
    let toptracksCard = null
    const baseUrl = 'http://localhost:3000/spotify-api/artists/'

    const { currentUser } = useContext(AuthContext)
    // setAristId(props.match.params.id);

    let artist = props.match.params.id

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get(
                    baseUrl + artistId + '?access_token=' + accessToken
                )
                setAristId(props.match.params.id)
                setArtistDataa(data)
                setTopTrack(null)
                console.log(data)
                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [props.match.params.id])

    const albumUrl = 'http://localhost:3000/spotify-api/artists/'
    useEffect(() => {
        async function fetchAlbumData() {
            try {
                setAristId(props.match.params.id)
                const { data } = await axios.get(
                    albumUrl +
                        artistAlbum +
                        '/albums?country=US&access_token=' +
                        accessToken
                )
                setTopTrack(data.items)
                if (data.items.length > 0) {
                    setArtistDataa(null)
                }
                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        }
        fetchAlbumData()
    }, [artistAlbum])

    const handleOpenshareModal = (trackDetails) => {
        setShowSharePostModal(true)
        setSharePost(trackDetails)
        setErrorModal(true)
    }

    const handleCloseModals = () => {
        setShowSharePostModal(false)
        setErrorModal(false)
    }

    const handleTopTracks = (id) => {
        setArtistAlbum(id)
    }

    const backtoArtist = (id) => {
        setAristId(id)
    }

    const buildCard = (album) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={album.id}>
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
                                handleOpenshareModal(album)
                            }}
                        >
                            share
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.buttonClass}
                            onClick={() => handleTopTracks(artistId)}
                        >
                            {' '}
                            Artist Album{' '}
                        </Button>
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
                </Card>
            </Grid>
        )
    }

    const buildtopCard = (album) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={album.id}>
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
                </Card>
            </Grid>
        )
    }
    if (artistData) {
        console.log(artistData)
        card = artistData && artistData
        return buildCard(artistData)
    } else if (topTrack && topTrack.length > 0 && artistAlbum) {
        console.log(topTrack)
        toptracksCard =
            topTrack &&
            topTrack.map((album) => {
                return buildtopCard(album)
            })
    }

    if (loading) {
        return <Loading />
    }
    if (hasError) {
        return <div>{hasError}</div>
    } else {
        return (
            <div class="main">
                <Grid container className={classes.grid} spacing={5}>
                    {card}
                </Grid>
                <Grid container className={classes.grid} spacing={5}>
                    {toptracksCard}
                </Grid>
            </div>
        )
    }
}

export default PlayByArtist
