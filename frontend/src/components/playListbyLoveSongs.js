import React, {useContext ,useState, useEffect } from 'react';
import { Card, CardActionArea, CardContent, Grid, Typography, makeStyles,Button } from '@material-ui/core';
import SpotifyWebApi from 'spotify-web-api-js';
import { AuthContext } from "../firebase/Auth";
import AddPostModal from "../pages/AddPostModal"

let Spotify = require('spotify-web-api-js');
// var s = new Spotify();

let spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken('BQAary77s1KQcaVZ-ke2a_Q9dqMMnwQNLy_QttRBP8ZGyk37rAtOH8FJX-Ie0Y5Z5jX2v0NeKbP3tuPY5qD9a_oQgylKzktfu-Te69-B0pb30JWeRT5QBH6ZN5IAxuHS0qs76YQ5ngh_5WhVokEXkL3eZz3aWLg2aTa_Ai4jlM0IBwsG');

const useStyles = makeStyles({
	card: {
		maxWidth: 350,
		height: 'auto',
		marginLeft: 'auto',
		marginRight: 'auto',
		borderRadius: 5,
		border: '1px solid #1e8678',
		boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
	},
	titleHead: {
		borderBottom: '1px solid #1e8678',
		fontWeight: 'bold',
		Color: 'black !important'
	},
	grid: {
		flexGrow: 1,
		flexDirection: 'row'
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
		float:'left'
		// background:'lightblue'
	  },

	  textFieldStyle: {
        left: ".5%",
        right:".5%",
        top: ".5%",
        bottom: "25%",
        width : "90%",
        margin: "auto",
        background: "white",
	},
	
	buttonClass:{
		marginLeft:'40%'
	}

});



const PlayListByLoveSongs = (props) => {
    const [playListData, setPlayListData,] = useState(undefined);
    const classes = useStyles();
    const [hasError, setHasError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [sharePost, setSharePost] = useState(null);;
    const [showSharePostModal, setShowSharePostModal] = useState(null);
	


	const { currentUser } = useContext(AuthContext);
	

    let card = null;
	useEffect(() => {
		async function fetchData() {
			try {
                spotifyApi.searchTracks('Love').then(
                    function (data) {
                        setPlayListData(data.tracks.items);
                        setLoading(false);
                    
                    },
                    function (err) {
                      setHasError(err);
                    }
                  );
                  
			} catch (e) {
				setHasError(e.message);
			}
		}
		fetchData();
	}, []);
	
	const handleOpenshareModal = (trackDetails) => {
        setShowSharePostModal(true);
        setSharePost(trackDetails);
        console.log(trackDetails);
	  };
	  
	  const handleCloseModals = () => {
       setShowSharePostModal(false);
	  };

		const buildCard = (playList) => {
			return (
				<Grid item xs={12} sm={6} md={4} lg={4} xl={2} key={playList.id}>
					<Card className={classes.card} variant='outlined'>
						<CardActionArea>
						<a href= {playList.external_urls.spotify}>Go to Spotify</a>
								<CardContent>
									<Typography className={classes.titleHead} gutterBottom variant='h6' component='h3'>
										<span>{playList.name}</span><br/>
										<span>Popularity: {playList.popularity}</span>
									</Typography>
									
								</CardContent>
						</CardActionArea>
						<iframe id="playSong" src= {"https://open.spotify.com/embed?uri="+ playList.uri}
						width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
						<div className="e-card-actions e-card-vertical">
						
						<Button variant="contained" color='secondary' className={classes.buttonClass}
					  onClick={() => {
						handleOpenshareModal(playList);
					  }}>
					  share
					</Button>

					
            </div>
            {showSharePostModal && (<AddPostModal
            isOpen={showSharePostModal}
            handleClose={handleCloseModals}
            title = {"Share Post"} 
            data={null}
            currentUser = {currentUser.uid}
            songData = {sharePost}
            postId = {null}
          />)}	
			</Card>
			</Grid>
			);
		};
		if (playListData) {
			console.log(playListData);
			card =
			playListData &&
			playListData.filter(x => x.available_markets.some(y => y.includes("US"))).map((playList) => {
				return buildCard(playList);
			});
			}
		
	if (loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	}
	
	else{
		return(
		<div class="main">
		<Grid container className={classes.grid} spacing={5}>
			{card}
		</Grid>
	</div>)
  }
}

export default PlayListByLoveSongs;