import React, { useContext, useState, useEffect } from 'react'
import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Typography,
    makeStyles,
    Button,
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
        marginTop: '10%',
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
        marginTop: '2%',
        flexGrow: 1,
        flexDirection: 'row',
        textAlign: 'center',
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
        justifyContent: 'center',
        marginBottom: '5%',
        marginTop: '5%',
    },
    h3class: {
        display: 'block',
        fontSize: '1.17em',
        marginTop: '1em',
        marginBottom: '1em',
        marginLeft: '0',
        marginRight: '0',
        fontWeight: 'bold',
    },
})

const PlayByPlayList = (props) => {
    const { accessToken } = useContext(SpotifyContext)
    const [playListData, setPlayListData] = useState(undefined)
    const classes = useStyles()
    const [hasError, setHasError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [sharePost, setSharePost] = useState(null)
    const [showSharePostModal, setShowSharePostModal] = useState(null)
    const [albumId, setAlbumId] = useState(props.match.params.id)
    const [errorModal, setErrorModal] = useState(false)

    let card = null
    const baseUrl = 'http://localhost:3000/spotify-api/playlists/'

    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        console.log('on load useeffect')
        async function fetchData() {
            try {
                console.log(albumId)
                const { data } = await axios.get(
                    baseUrl +
                        props.match.params.id +
                        '?access_token=' +
                        accessToken
                )
                setPlayListData(data)
                console.log(data)
                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [props.match.params.id])

    const handleOpenshareModal = (trackDetails) => {
        setShowSharePostModal(true)
        setSharePost(trackDetails)
        setErrorModal(true)
    }

    const handleCloseModals = () => {
        setShowSharePostModal(false)
        setErrorModal(false)
    }

    const buildCard = (album) => {
        return (
            <div class="main">
                <Grid
                    className={classes.grid}
                    spacing={5}
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    key={album.id}
                >
                    <Card className={classes.card} variant="outlined">
                        <CardActionArea>
                            <CardContent>
                                <Typography
                                    className={classes.titleHead}
                                    gutterBottom
                                    variant="h6"
                                    component={classes.h3class}
                                >
                                    <span>{album.name}</span>
                                    <br />
                                    <span>
                                        Track Number: {album.track_number}
                                    </span>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <iframe
                            id="playSong"
                            src={
                                'https://open.spotify.com/embed?uri=' +
                                album.uri
                            }
                            width="300"
                            height="380"
                            frameBorder="0"
                            allowtransparency="true"
                            allow="encrypted-media"
                        ></iframe>
                        <div className="e-card-actions e-card-vertical">
                            <center>
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
                            </center>
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
            </div>
        )
    }
    if (playListData) {
        console.log(playListData)
        card = playListData && playListData
        return buildCard(playListData)
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
            </div>
        )
    }
}

export default PlayByPlayList
