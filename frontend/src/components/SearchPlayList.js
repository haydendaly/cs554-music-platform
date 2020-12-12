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
import SearchComponent from './SearchComponent'
import ShowErrorModal from './Modals/ShowErrorModal'

let Spotify = require('spotify-web-api-js')
// var s = new Spotify();

let spotifyApi = new SpotifyWebApi()

spotifyApi.setAccessToken(
    'BQD4dH1FxEk_x75QeJq2Qlrk-lWu5Obvq4q4vB-D_B6hEF8xYdTPlRoQ7UawSPqqqE2wy0qJ-YO-WYA5NaheFM06FZfVWZqn3lDrQFKCX-inV4BWZLCo2fBxF8MAzD63CiUaTCAjFVK7rCEvpfnEEkXkriijfgHYJZ_wc8ZZaapwKKuC'
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

const SearchPlayList = (props) => {
    const [playListData, setPlayListData] = useState(undefined)
    const classes = useStyles()
    const [hasError, setHasError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [sharePost, setSharePost] = useState(null)
    const [showSharePostModal, setShowSharePostModal] = useState(null)
    const [searchTerm, setSearchTerm] = useState('Love')
    const [errorModal, setErrorModal] = useState(false)

    const { currentUser } = useContext(AuthContext)

    let card = null
    useEffect(() => {
        async function fetchData() {
            try {
                spotifyApi.searchTracks(searchTerm, { country: 'US' }).then(
                    function (data) {
                        setPlayListData(data.tracks.items)
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
    }, [searchTerm])

    const handleOpenshareModal = (trackDetails) => {
        setShowSharePostModal(true)
        setSharePost(trackDetails)
        console.log(trackDetails)
        setErrorModal(true)
    }

    const handleCloseModals = () => {
        setShowSharePostModal(false)
        setErrorModal(false)
    }

    const searchValue = async (value) => {
        setSearchTerm(value)
    }

    const buildCard = (playList) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={2} key={playList.id}>
                <Card className={classes.card} variant="outlined">
                    <CardActionArea>
                        <a href={playList.external_urls.spotify}>
                            Go to Spotify
                        </a>
                        <CardContent>
                            <Typography
                                className={classes.titleHead}
                                gutterBottom
                                variant="h6"
                                component="h3"
                            >
                                <span>{playList.name}</span>
                                <br />
                                <span>Popularity: {playList.popularity}</span>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <iframe
                        id="playSong"
                        src={
                            'https://open.spotify.com/embed?uri=' + playList.uri
                        }
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
                                handleOpenshareModal(playList)
                            }}
                        >
                            share
                        </Button>
                    </div>
                </Card>
            </Grid>
        )
    }
    if (playListData) {
        console.log(playListData)
        card =
            playListData &&
            playListData
                .filter((x) =>
                    x.available_markets.some((y) => y.includes('US'))
                )
                .map((playList) => {
                    return buildCard(playList)
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
                <br />
                <Grid container className={classes.grid} spacing={5}>
                    {card}
                </Grid>

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

export default SearchPlayList