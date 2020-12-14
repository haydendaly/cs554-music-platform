import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from '@material-ui/core'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import {
    faThumbsUp,
    faComments,
    faTrash,
    faPencilAlt,
} from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../firebase/Auth'
import AddPostModal from '../components/Modals/AddPostModal'

function PostInsert() {
    const { currentUser } = useContext(AuthContext)

    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    const [comment, setCommentData] = useState(undefined)
    const [openComment, setOpenComment] = useState(undefined)
    const [commentArray, setCommentArray] = useState(null)
    const [postData, setPostData] = useState(null)
    const [editPostData, seteditPostData] = useState(false)
    const [postId, setPostId] = useState(null)

    const [showAddModal, setShowAddModal] = useState(false)
    const handleClose = () => setShowAddModal(false)
    const handleShow = () => setShowAddModal(true)

    /***
     * Render all Post
     */
    useEffect(() => {
        getAllPost()
    }, [showAddModal])

    const getAllPost = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/post')
            data.sort(function (item1, item2) {
                return new Date(item2.timeStamp) - new Date(item1.timeStamp)
            })
            setPost(data)
            setLoading(false)
        } catch (e) {
            console.log(`error found : ${e}`)
        }
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
        if (currentUser && currentUser.uid) {
            try {
                const { commentData } = await axios.post(
                    `http://localhost:3000/api/post/${commentPost._id}/comment`,
                    {
                        userId: currentUser.uid,
                        commentText: comment,
                    }
                )
                getAllPost()
                let field = document.getElementById(
                    'commentField' + commentPost._id
                )
                field.value = ''
            } catch (error) {
                throw `${error}`
            }
        } else {
            let field = document.getElementById(
                'commentField' + commentPost._id
            )
            field.value = ''
            alert('Please LogIn to Comment on Post')
        }
    }

    /**
     * Delete given comment ,
     * only if logged In commented ,
     */
    const deleteComment = async (argPost, argComment) => {
        if (
            currentUser &&
            currentUser.uid &&
            currentUser.uid === argComment.userId
        ) {
            try {
                const { data } = await axios.delete(
                    `http://localhost:3000/api/post/${argPost._id}/comment/${argComment._id}`
                )
                getAllPost()
            } catch (error) {
                console.log(`ERROR IN DELETE COMMENT : ${error}`)
            }
        } else {
            console.log(
                `currentUSer=${currentUser.uid}, commentUser=${argComment.userId}, postId= http://localhost:3000/api/post/${argPost._id}/comment/${argComment._id}`
            )
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
        if (currentUser && currentUser.uid) {
            try {
                let data = isLikedByUser(likedpost)

                if (!data) {
                    const { likeData } = await axios.post(
                        `http://localhost:3000/api/post/${likedpost._id}/likes`,
                        {
                            userId: currentUser.uid,
                        }
                    )
                } else {
                    const { likeData } = await axios.delete(
                        `http://localhost:3000/api/post/${likedpost._id}/likes/${data._id}`
                    )
                }
                getAllPost()
            } catch (e) {
                console.log(`ERROR IN MAIN : ${e}`)
            }
        } else {
            alert('Please LogIn to like Post')
        }
    }

    const isLikedByUser = (likePost) => {
        if (currentUser && currentUser.uid) {
            let likeArray = likePost['likesArray']

            if (likeArray.length > 0) {
                let data = likeArray.filter(function (item) {
                    return currentUser.uid === item['userId']
                })
                if (data) return data[0]
            }
            return null
        }
    }
    /**
     * Edit given post ,
     * only if logged In uploaded that post,
     */
    const editPost = async (argPost) => {
        if (
            currentUser &&
            currentUser.uid &&
            currentUser.uid === argPost.userId
        ) {
            seteditPostData(true) //set edit mode true
            setPostId(argPost._id) //set postId
            setPostData(argPost.text) // set pre text into textfield
            setShowAddModal(true) // show modal in edit mode
        } else {
            alert('Invalid user to edit post')
        }
    }

    /**
     * Delete given post ,
     * only if logged In uploaded that post,
     */
    const deletePost = async (argPost) => {
        if (
            currentUser &&
            currentUser.uid &&
            currentUser.uid === argPost.userId
        ) {
            try {
                const { data } = await axios.delete(
                    `http://localhost:3000/api/post/${argPost._id}`
                )
                getAllPost()
            } catch (error) {
                console.log(`ERROR IN DELETE POST : ${error}`)
            }
        }
    }

    const showAddPostModal = () => {
        if (currentUser) {
            handleShow()
        } else {
            alert('Please logIn to add post')
        }
    }

    const closeAddPostModal = () => {
        handleClose()
        getAllPost()
        if (editPostData) {
            setPostData(null)
            setPostId(null)
            seteditPostData(false)
        }
    }

    const hideEditMode = (currentData) => {
        if (
            currentUser &&
            currentUser.uid &&
            currentUser.uid === currentData.userId
        ) {
            return false
        }
        return true
    }

    return (
        <div className="post-main">
            <div className="post-new-button">
                <button onClick={() => showAddPostModal()}>Add Post</button>
                <br /> <br />
            </div>

            {showAddModal && (
                <AddPostModal
                    isOpen={showAddModal}
                    handleClose={closeAddPostModal}
                    title={editPostData ? 'EditPost' : 'Add Post'}
                    data={editPostData ? postData : null}
                    currentUser={currentUser.uid}
                    songData={null}
                    postId={editPostData ? postId : null}
                />
            )}

            {/* display post */}
            <div className="post-list">
                {post && post.length > 0 ? (
                    post.map((postItem) => (
                        <div key={postItem._id} className="post-post shadow">
                            <div className="post-header">
                                <div className="post-header-info">
                                    <img
                                        className="post-user-icon shadow"
                                        src={`http://localhost:3000/api/user/photo/${postItem.userId}`}
                                        alt={`User: ${postItem.userId}`}
                                    />
                                    <div className="post-header-text">
                                        <p className="post-user-name">
                                            {postItem.displayName}
                                        </p>
                                        <p className="post-header-date">
                                            {postItem.timeStamp}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="post-header-options"
                                    hidden={hideEditMode(postItem)}
                                >
                                    <div
                                        onClick={() => editPost(postItem)}
                                        className="post-button"
                                    >
                                        <Icon
                                            icon={faPencilAlt}
                                            className="menu-icon"
                                        />
                                    </div>
                                    <div
                                        onClick={() => deletePost(postItem)}
                                        className="post-button"
                                    >
                                        <Icon
                                            icon={faTrash}
                                            className="menu-icon"
                                        />
                                    </div>
                                </div>
                            </div>
                            <p className="post-body">{postItem.text}</p>
                            {postItem.songData && (
                                <div className="post-song">
                                    {/* <a href={postItem.songData.href}>
                                        {postItem.songData.name}
                                    </a> */}
                                    <iframe
                                        title={postItem.songData.name}
                                        id="playSong"
                                        src={`https://open.spotify.com/embed?uri=${postItem.songData.uri}`}
                                        width="300"
                                        height="380"
                                        frameborder="0"
                                        allowtransparency="true"
                                    />
                                </div>
                            )}
                            <div className="post-footer">
                                <div
                                    onClick={() => handleLike(postItem)}
                                    className="post-button"
                                    style={
                                        isLikedByUser(postItem)
                                            ? { color: '#fff' }
                                            : {}
                                    }
                                >
                                    <Icon
                                        icon={faThumbsUp}
                                        className="menu-icon"
                                    />
                                    <p>
                                        {postItem.likesArray
                                            ? postItem.likesArray.length
                                            : 0}
                                    </p>
                                </div>
                                <div
                                    onClick={() =>
                                        setOpenComment(
                                            openComment === postItem._id
                                                ? undefined
                                                : postItem._id
                                        )
                                    }
                                    className="post-button"
                                >
                                    <Icon
                                        icon={faComments}
                                        className="menu-icon"
                                    />
                                    <p>
                                        {postItem.commentsArray
                                            ? postItem.commentsArray.length
                                            : 0}
                                    </p>
                                </div>
                            </div>
                            <div className="post-list">
                                {openComment && openComment === postItem._id && (
                                    <div>
                                        <textarea
                                            className="post-comments"
                                            id={'commentField' + postItem._id}
                                            type="text"
                                            placeholder="Enter Comment here...."
                                            rows="2"
                                            onChange={handleCommentTextField}
                                        />

                                        <Button
                                            className="post-comments-add-button"
                                            variant="contained"
                                            color="secondary"
                                            size="medium"
                                            type="reset"
                                            defaultValue="Reset"
                                            onClick={() =>
                                                saveComment(postItem)
                                            }
                                        >
                                            Enter
                                        </Button>

                                        {postItem['commentsArray'] &&
                                        postItem['commentsArray'].length > 0 ? (
                                            postItem['commentsArray']
                                                .sort(function (item1, item2) {
                                                    return (
                                                        new Date(
                                                            item2.timeStamp
                                                        ) -
                                                        new Date(
                                                            item1.timeStamp
                                                        )
                                                    )
                                                })
                                                .map((commentItem) => (
                                                    <div
                                                        key={commentItem._id}
                                                        className="post-post shadow"
                                                    >
                                                        <div className="post-header">
                                                            <div className="post-header-info">
                                                                <img
                                                                    className="post-user-icon shadow"
                                                                    src={`http://localhost:3000/api/user/photo/${commentItem.userId}`}
                                                                    alt={`User: ${commentItem.userId}`}
                                                                />
                                                                <div className="post-header-text">
                                                                    <p className="post-user-name">
                                                                        {
                                                                            commentItem.displayName
                                                                        }
                                                                    </p>
                                                                    <p className="post-header-date">
                                                                        {
                                                                            commentItem.timeStamp
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="post-header-options"
                                                                hidden={hideEditMode(
                                                                    commentItem
                                                                )}
                                                            >
                                                                <div
                                                                    onClick={() =>
                                                                        deleteComment(
                                                                            postItem,
                                                                            commentItem
                                                                        )
                                                                    }
                                                                    className="post-button"
                                                                >
                                                                    <Icon
                                                                        icon={
                                                                            faTrash
                                                                        }
                                                                        className="menu-icon"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="post-body">
                                                            {
                                                                commentItem.commentText
                                                            }
                                                        </p>
                                                    </div>
                                                ))
                                        ) : (
                                            <p> No comments </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No Posts</p>
                )}
            </div>
        </div>
    )
}

export default PostInsert
