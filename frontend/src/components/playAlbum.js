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
import SpotifyWebApi from 'spotify-web-api-js'
import { AuthContext } from '../firebase/Auth'
import AddPostModal from './Modals/AddPostModal'

let Spotify = require('spotify-web-api-js')
// var s = new Spotify();

let spotifyApi = new SpotifyWebApi()

spotifyApi.setAccessToken(
    'BQBclgNt0TcT10snXjsw5KbLGIxzuCjtTyLeU9mX-knZrueTkSrKnq1JJ-G_ncLoJUyhBIKfqn_YB2mwy5mWSHbxaTj3-BqgPPG-tRGDauzL-OkAkfJMyhsBaNi3Rj6FLPx2P5ESnf_S_eW6rOO7ZqVU4Ct8NQ35dnMJVHfOw9Rrm-P5'
)

const useStyles = makeStyles({
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

    let card = null

    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        console.log('on load useeffect')
        async function fetchData() {
            try {
                spotifyApi.getAlbum('5U4W9E5WsYb2jUQWePT8Xm').then(
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
    }, [])

    const handleOpenshareModal = (trackDetails) => {
        setShowSharePostModal(true)
        setSharePost(trackDetails)
        console.log(trackDetails)
    }

    const handleCloseModals = () => {
        setShowSharePostModal(false)
    }

    const buildCard = (album) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={2} key={album.id}>
                <Card className={classes.card} variant="outlined">
                    <CardActionArea>
                        <a href={album.external_urls.spotify}>Go to Spotify</a>
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
                    {showSharePostModal && (
                        <AddPostModal
                            isOpen={showSharePostModal}
                            handleClose={handleCloseModals}
                            title={'Share Post'}
                            data={null}
                            currentUser={currentUser.uid}
                            songData={sharePost}
                            postId={null}
                        />
                    )}
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
                <>
                    {/* <Modal className={classes.modal} show={showSharePostModal} onHide={handleCloseModals}>
			  <Modal.Header closeButton>
				<Modal.Title>Modal heading</Modal.Title>
			  </Modal.Header>
			 
			  <Modal.Body>
			  <textarea className={classes.textFieldStyle} type='text' placeholder="Enter description here...." rows="2" /> 
			  <textarea className={classes.textFieldStyle} value={sharePost? 'name:'+sharePost.name+' href:'+sharePost.external_urls.spotify+' id:'+sharePost.id : ''} rows="4"></textarea></Modal.Body>
			  <Modal.Footer>
				<Button variant="contained" color='secondary' onClick={handleCloseModals}>
				  Close
				</Button>
				<Button variant="contained" color='primary'  onClick={handleCloseModals}>
				  Save Changes
				</Button>
			  </Modal.Footer>
			</Modal> */}
                </>

                <Grid container className={classes.grid} spacing={5}>
                    {card}
                </Grid>
            </div>
        )
    }
}

export default PlayAlbum
