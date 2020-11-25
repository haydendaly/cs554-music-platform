import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios'
import { makeStyles, Card, CardContent,Typography, Button } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal'
import css from "../App.css"

const useStyles = makeStyles({
    
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
    classLike: {
        marginButtom: '0em',
        height:'2em',
        with: '1em',
        marginLeft: '470px',
        marginRight:'1%'
    },

    textFieldStyle: {
        left: ".5%",
        right:".5%",
        top: ".5%",
        bottom: "25%",
        width : "90%",
        margin: "auto",
        background: "white",
    }
})
function PostInsert() {
    const classes = useStyles();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const [comment, setCommentData] = useState(undefined);
    const [postData, setPostData] = useState(null)

    const [showAddModal, setShowAddModal] = useState(false);
    const handleClose = () => setShowAddModal(false);
    const handleShow = () => setShowAddModal(true);

    /***
     * Render all Post
     */
    useEffect(() => {
        getAllPost() 
    },[showAddModal])
    
    const getAllPost = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/api/post");
            setPost(data); 
            setLoading(false);
        } catch (e) {
            console.log(`error found : ${e}`);
        }
    }

    /***
     * Handle comment hide/show
     */
    const isCommentExpand = (commentTap) => {       
    }

    /***
     * Retrieve comment data from textfield
     */
    const handleCommentTextField = (e) => {
        setCommentData(e.target.value)
    }

    /***
     * save comment on given post 
     * render complete data
     */
    const saveComment = async (commentPost) => {
        try {
            const { commentData } = await axios.post(`http://localhost:3000/api/post/${commentPost._id}/comment`, {
                userId : commentPost["userId"],
                commentText : comment
            }); 
            getAllPost()
            let field = document.getElementById("commentField" + commentPost._id)
            field.value = ""
        } catch (error) {
            throw `${error}`
        }
       
    }

    /***
     * Check if post liked by login user.
     * 
     * if yes, then again tap on like button will unlike it and remove from liked list.
     * 
     * If no, then post is liked, and added to liked list.
     */
    const handleLike = async (likedpost) => {
        
        try {
            let data = isLikedByUser(likedpost)
            if(!data){
                const { likeData } = await axios.post(`http://localhost:3000/api/post/${likedpost._id}/likes`, {
                userId : likedpost["userId"],
             });

            }else{
                const { likeData } = await axios.delete(`http://localhost:3000/api/post/${likedpost._id}/likes/${data._id}`);
            }           
             getAllPost()
            
        } catch (e) {
            console.log(`ERROR IN MAIN : ${e}`);
        }
    }

    const isLikedByUser = (likePost) => {
        let likeArray = likePost["likesArray"]

        if(likeArray.length > 0){
          let data = likeArray.filter(function(item){
                       return item.userId === likePost["userId"];
                   });
           if(data) return data[0]
        }
        return null    
    }
        
    /***
     * Get Post data from post textfield
     */
    const handleTextField = async(e) => {
        setPostData(e.target.value)
    }

    /***
     * Save Post
     */
    const handleAddPost = async () => {
      try {
        const { data } = await axios.post("http://localhost:3000/api/post", {
           userId : "1", // pass valid userid here
           text : postData,
           commentsArray :[],
           likesArray : []
        });
        handleClose()
       
     } catch (e) {
        console.log(`ERROR IN ADD POST : ${e}`);
     } 
   
    };

   
    
    return (
        <div class="main">
            <div>
            {/* add post */}
            <button onClick={handleShow}>Add Post</button>
            </div>

            <Modal show={showAddModal} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add Post</Modal.Title>        
            </Modal.Header>  
            <Modal.Body> 
            <textarea  className={classes.textFieldStyle} id="txtPost" type='text' placeholder="Enter Post here...." rows="4" onChange={handleTextField}/>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="contained" color='secondary' size='medium' type="reset" defaultValue="Reset"  onClick={() => handleAddPost()}>Enter</Button>
            <Button onClick={handleClose}> Cancel </Button> 
            </Modal.Footer>
            </Modal>

            {/* display post */}
            <ul> {(post && post.length > 0) ? (post.map(product =>
             
                <li key={product._id} className="list__item product">
                <div>
                    <Card className={classes.card} variant='outlined'>
                    <CardContent>
                        <Typography  gutterBottom variant='h6' component='h2'>{product.text}</Typography>
                    </CardContent> 
                    </Card>
    
                    <Button id={"like" + product._id} className={classes.classLike} variant="contained" color={isLikedByUser(product) ? "primary" : "inherit" } size='medium' onClick={() => handleLike(product)}>{product.likesArray ? product.likesArray.length : 0 } Like</Button>
                    <Button id={"comment" + product._id} variant="contained" color='secondary' size='medium'  onClick={() => isCommentExpand(product)}>{product.commentsArray ? product.commentsArray.length : 0} Comment</Button>
                       
                        <ul>
                          {(product["commentsArray"] && product["commentsArray"].length > 0) ? (product["commentsArray"].map(commentItem =>
                             
                            <li className={classes.classLike} key={commentItem._id} className="list__item product">
                                {commentItem["commentText"]}
                            </li>
                          
                         )) : (<p>No Comment</p>)}
                        </ul>
                       
                       <textarea className={classes.textFieldStyle} id={"commentField" + product._id} type='text' placeholder="Enter Comment here...." rows="2" onChange={handleCommentTextField}/>
                       <Button  variant="contained" color='secondary' size='medium' type="reset" defaultValue="Reset"  onClick={() => saveComment(product)}>Enter</Button>         
                 </div>
              </li>
                
        )) : (<p>No Post</p>)}
        </ul>

            
        </div>
    );
}

export default PostInsert