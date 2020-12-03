import React, { useState, useEffect } from 'react';
import '../App.css';
import { Card, CardActionArea, CardContent, Grid, Typography, makeStyles,Button } from '@material-ui/core';
import SpotifyWebApi from 'spotify-web-api-js';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from "../firebase/Auth";

let Spotify = require('spotify-web-api-js');
// var s = new Spotify();

let spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken('BQBup4dcPZwityTzoZibYUD8O63LEDhP2_bnHB7AslR_I_D1q_Z8CHAB-1z08d9Hcttq8_u8BosaHIkaCNOjkhhUMwrLqf-KkhxK86zr3m1LvKezx4mIoOU7GEQF4TnMSvkaMMgStRzm_pP8Ix1FQVDTuWaDbkYRbfaDwTPuuFI2ajmu');

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
	
	const [showAddModal, setShowAddModal] = useState(false);
    const handleClose = () => setShowAddModal(false);
	const handleShow = () => setShowAddModal(true);
	

    let card = null;
	useEffect(() => {
		console.log('on load useeffect');
		async function fetchData() {
			try {
				console.log('hi there');
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
						width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
						<div className="e-card-actions e-card-vertical">
						<Button variant="contained" color='secondary' className={classes.buttonClass}
					  onClick={() => {
						handleOpenshareModal(playList);
					  }}>
					  share
					</Button>
					</div>
						
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
		<div>
		<>  
		<Modal className={classes.modal} show={showSharePostModal} onHide={handleCloseModals}>
		  <Modal.Header closeButton>
			<Modal.Title>Modal heading</Modal.Title>
		  </Modal.Header>
		  <textarea className={classes.textFieldStyle} type='text' placeholder="you can enter description here...." rows="3" />
		  <Modal.Body><textarea className={classes.textFieldStyle} value={sharePost? 'name:'+sharePost.name+' href:'+sharePost.href+' id:'+sharePost.id+' img:'+sharePost.album.images[0].url : ''} rows="5" ></textarea></Modal.Body>
		  <Modal.Footer>
			<Button variant="contained" color='secondary' onClick={handleCloseModals}>
			  Close
			</Button>
			<Button variant="contained" color='primary'  onClick={handleCloseModals}>
			  Save Changes
			</Button>
		  </Modal.Footer>
		</Modal>
	  </>


		
		<Grid container className={classes.grid} spacing={5}>
						{card}
					</Grid>
				</div>)
	}
}

export default PlayListByLoveSongs;