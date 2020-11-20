import '../App.css';
import React, { useState, useEffect } from 'react';
import { makeStyles, Card, CardContent, CardMedia, Typography, CardHeader, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles({
    TextField:{
        width:'50%',
        height: '30%'
    },
    Button:{
		marginleft:'.5%',
        marginRight:'.5%',
        
    },
    card: {
        marginTop:'5%',
		maxWidth: '50%',
		height: '100px',
		marginLeft: 'auto',
		marginRight: 'auto',
		borderRadius: 5,
		border: '1px solid #1e8678',
		boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
    },
    media: {
		height: '100%',
		width: '100%'
    },

    inputClass: {
        width : '5.6375em'
    },

    classLike: {
        marginButtom: '0em',
        height:'2em',
        with: '1em',
        marginLeft: '470px',
        marginRight:'1%'
    },

    comment: {
        width: '400px',
        height: '5em',
        // marginLeft:'50px'
    }

})
const Home = (props) => {

    const classes = useStyles();
    const [postData, setPostData] = useState(undefined);
    const [isComment, setIsComment] = useState(false);
    const [comment, setCommentData] = useState(undefined);
    const [showcomment, setShowComment] = useState(false);
    const [enterComment, setEnterComment] = useState(false);


    const handleChange = async (e) => {
        setPostData(e.target.value);
      };
    
    const getData = async (e) => {
        setCommentData(e.target.value);
    }

    const handleClick = async () => {
       alert(postData);
       setEnterComment(true);
    };
    const handleComment = async () => {
        setIsComment(true);
    }
    const saveComment = async () => {
        alert(comment);
        setIsComment(false);
        setShowComment(true);
    }
    
    return(
        <div>
        <div className="form-group">
        Enter Post: 
        <TextField id="txtPost" type='text' label="Outlined" variant="outlined" className={classes.TextField} onChange={ handleChange}/>
        <Button className={classes.inputClass} variant="contained" color='secondary' size='medium' type="reset" defaultValue="Reset"  onClick={() => handleClick()}>Enter</Button>
      </div>
      <div>
      {enterComment ? (<Card className={classes.card} variant='outlined'>
      <CardContent>
								<Typography  gutterBottom variant='h6' component='h2'>
									{postData}
								</Typography>
                            </CardContent>

      </Card>) :''}
      {enterComment ? (<Button className={classes.classLike} variant="contained" color='secondary' size='medium' onClick={() => handleClick()}>Like</Button>) : ''}
      {enterComment ? (<Button variant="contained" color='secondary' size='medium' onClick={() => handleComment()}>Comment</Button>) : ''}
      <div>
      {isComment ?(<TextField id="txtComment" type='text' className={classes.comment} label="Outlined" variant="outlined" onChange={ getData}/>
      ) : ''}
      {isComment ? (
      <Button variant="contained" color='secondary' size='medium'  onClick={() => saveComment()}>Enter</Button> ) : ('')}
      <br/>
      <label>{comment}</label>
      </div>
      </div>
        </div>
    )
};

export default Home;