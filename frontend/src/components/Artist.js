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
    const [errorModal, setErrorModal] = useState(false)

    const { currentUser } = useContext(AuthContext)

    let card = null
    const baseUrl = 'http://localhost:3000/spotify-api/artists/'
    useEffect(() => {
        console.log('on load useeffect');
        async function fetchArtistData() {
            try {
                console.log(albumId);
            const { data } = await axios.get(baseUrl+artistId);
                setArtistData(data);
                console.log(data)
                setLoading(false);}
             catch (e) {
                console.log(e);
            }
        }
        fetchArtistData();
    }, [props.match.params.id]);

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
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={artist.id}>
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
    if(artistData){
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
    } else {
        return (
            <div class="main">
                
                    <br />
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
