import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles, Card, CardContent, Typography, Button } from "@material-ui/core";
import { AuthContext } from "../firebase/Auth";
import AddPostModal from "../pages/AddPostModal";

const useStyles = makeStyles((theme) => ({
  Button: {
    marginleft: ".5%",
    marginRight: ".5%",
  },
  card: {
    marginTop: "5%",
    maxWidth: "50%",
    height: "100px",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    border: "1px solid #1e8678",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
  },
  classLike: {
    marginButtom: "0em",
    height: "2em",
    with: "1em",
    marginLeft: "470px",
    marginRight: "1%",
  },
  toprightCornerParent: {
    display: "flex",
  },

  toprightCornerButton: {
    // display :"flex",
    marginleft: "auto",
    // top: "2px",
    // right: "2px",
    // zindex: "100"
  },
  textFieldStyle: {
    left: ".5%",
    right: ".5%",
    top: ".5%",
    bottom: "25%",
    width: "90%",
    margin: "auto",
    background: "white",
  },
  root: {
    display: "flex",
    maxWidth: "100%",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: "50%",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));
function UserProfile() {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const [postData, setPostData] = useState(null);
  const [editPostData, seteditPostData] = useState(false);
  const [postId, setPostId] = useState(null);

 

  /***
   * Render current user
   */
  useEffect(() => {
    getUserData();
  }, [currentUser]);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/user/${currentUser.uid}`);
      setPost(data);
      setLoading(false);
    } catch (e) {
      console.log(`error found : ${e}`);
    }
  };

  return (
    <div className="main">
      <br />
      <div>
        {/* show add/edit post popup */}
        <center>
          {" "}
          <button onClick={() => showAddPostModal()}>Add Post</button>
        </center>
      </div>
      <br />
      {showAddModal && (
        <AddPostModal
          isOpen={showAddModal}
          handleClose={closeAddPostModal}
          title={editPostData ? "EditPost" : "Add Post"}
          data={editPostData ? postData : null}
          currentUser={currentUser.uid}
          songData={null}
          postId={editPostData ? postId : null}
        />
      )}

      {/* display post */}
      <ul>
        {" "}
        {post && post.length > 0 ? (
          post.map((product) => (
            <li key={product._id} className="list__item product">
              <div>
                {product.songData ? (
                  <Card className={classes.root}>
                    <div className={classes.details}>
                      <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                          {product.songData.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {product.songData.id}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          <a href={product.songData.href}>{product.songData.href}</a>
                        </Typography>
                        <iframe
                          id="playSong"
                          src={"https://open.spotify.com/embed?uri=" + product.songData.uri}
                          width="300"
                          height="380"
                          frameborder="0"
                          allowtransparency="true"
                        ></iframe>
                      </CardContent>
                    </div>
                  </Card>
                ) : (
                  ""
                )}

                <Card className={classes.root}>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      {product.text}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                      <div class={classes.toprightCornerParent} hidden={hideEditMode(product)}>
                        <Button
                          id={"edit" + product._id}
                          className={classes.toprightCornerButton}
                          variant="contained"
                          color="primary"
                          size="medium"
                          onClick={() => editPost(product)}
                        >
                          Edit
                        </Button>
                        <Button
                          id={"delete" + product._id}
                          className={classes.toprightCornerButton}
                          variant="contained"
                          color="primary"
                          size="medium"
                          onClick={() => deletePost(product)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Typography>
                  </CardContent>
                </Card>

                <Button
                  id={"like" + product._id}
                  className={classes.classLike}
                  variant="contained"
                  color={isLikedByUser(product) ? "primary" : "inherit"}
                  size="medium"
                  onClick={() => handleLike(product)}
                >
                  {product.likesArray ? product.likesArray.length : 0} Like
                </Button>
                <Button
                  id={"comment" + product._id}
                  variant="contained"
                  color="secondary"
                  size="medium"
                  onClick={() => isCommentExpand(product)}
                >
                  {product.commentsArray ? product.commentsArray.length : 0} Comment
                </Button>

                <ul>
                  {product["commentsArray"] && product["commentsArray"].length > 0 ? (
                    product["commentsArray"].map((commentItem) => (
                      <li className={classes.classLike} key={commentItem._id} className="list__item product">
                        {commentItem["commentText"]}
                        <div hidden={hideEditMode(commentItem)}>
                          <Button
                            id={"delete" + commentItem._id}
                            variant="contained"
                            color="primary"
                            size="medium"
                            onClick={() => deleteComment(product, commentItem)}
                          >
                            Delete
                          </Button>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p>No Comment</p>
                  )}
                </ul>

                <textarea
                  className={classes.textFieldStyle}
                  id={"commentField" + product._id}
                  type="text"
                  placeholder="Enter Comment here...."
                  rows="2"
                  onChange={handleCommentTextField}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  size="medium"
                  type="reset"
                  defaultValue="Reset"
                  onClick={() => saveComment(product)}
                >
                  Enter
                </Button>
                <br />
                <br />
              </div>
            </li>
          ))
        ) : (
          <p>No Post</p>
        )}
      </ul>
    </div>
  );
}

export default UserProfile;
