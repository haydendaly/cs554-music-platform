import React, { useState } from 'react'
import ReactModal from 'react-modal'
import {
    makeStyles,
    Button,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Avatar,
} from '@material-ui/core'
import axios from 'axios'

//For react-modal
ReactModal.setAppElement('#root')

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        border: '1px solid #28547a',
        borderRadius: '4px',
    },
}

const useStyles = makeStyles({
    Button: {
        marginleft: '.5%',
        marginRight: '.5%',
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
    labelStyle: {
        color: 'blue',
        width: '100%',
        size: 'bold',
    },
    songFieldStyle: {
        width: '100%',
        height: '300px',
    },
    imageStyle: {
        width: '50%',
        height: '50%',
    },
    root: {
        maxWidth: '100%',
        maxHeight: '50%',
    },
    media: {
        height: '50%',
        width: '100%',
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: 'red[500]',
    },
})

function AddPostModal(props) {
    const [showAddModal, setShowAddModal] = useState(props.isOpen)
    const classes = useStyles()
    const [postData, setPostData] = useState(null)

    const handleCloseAddModal = () => {
        setShowAddModal(true)
        props.handleClose()
    }

    /***
     * Get Post data from post textfield
     */
    const handleTextField = async (e) => {
        setPostData(e.target.value)
    }

    /***
     * If user logged in , then allow to add, edit or delete post
     * Else show message "You must log in to post"
     * Once posted , save post
     */
    const handleAddPost = async () => {
        if (props.currentUser) {
            try {
                const { data } = await axios.post(
                    `http://${window.location.hostname}:3000/api/post`,
                    {
                        userId: props.currentUser, // pass valid userid here
                        text: postData,
                        songData: props.songData,
                        commentsArray: [],
                        likesArray: [],
                    }
                )
                handleCloseAddModal()
            } catch (e) {
                console.log(`ERROR IN ADD POST : ${e}`)
            }
        } else {
            alert('You must logged in to Post on SpotifyTwitter')
        }
    }

    const handleEditPost = async () => {
        try {
            const { data } = await axios.patch(
                `http://${window.location.hostname}:3000/api/post/${props.postId}`,
                {
                    text: postData ? postData : props.data,
                }
            )
            handleCloseAddModal() // close modal
        } catch (e) {
            console.log(`ERROR IN EDIT POST : ${e}`)
        }
    }

    return (
        <div>
            <ReactModal
                name="addModal"
                isOpen={showAddModal}
                contentLabel="Add Modal"
                style={customStyles}
            >
                <label className={classes.labelStyle}>{props.title}</label>

                {props.songData ? (
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={
                                <Avatar
                                    aria-label="recipe"
                                    className={classes.avatar}
                                >
                                    S
                                </Avatar>
                            }
                            title={props.songData.name}
                            subheader={props.songData.id}
                        />
                        <iframe
                            id={props.songData.uri}
                            title={props.songData.uri}
                            src={
                                'https://open.spotify.com/embed?uri=' +
                                props.songData.uri
                            }
                            width="300"
                            height="380"
                            frameborder="0"
                            allowtransparency="true"
                            allow="encrypted-media"
                        ></iframe>
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                <a href={props.songData.href}>
                                    {props.songData.href}
                                </a>
                                <br />
                                <br />
                                <textarea
                                    className={classes.textFieldStyle}
                                    id="txtPost"
                                    type="text"
                                    placeholder="Enter Post here...."
                                    defaultValue={props.data}
                                    rows="2"
                                    onChange={handleTextField}
                                    autoFocus="true"
                                />
                            </Typography>
                        </CardContent>
                    </Card>
                ) : (
                    <textarea
                        className={classes.textFieldStyle}
                        id="txtPost"
                        type="text"
                        placeholder="Enter Post here...."
                        defaultValue={props.data}
                        rows="4"
                        onChange={handleTextField}
                        autoFocus="true"
                    />
                )}

                <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    type="reset"
                    defaultValue="Reset"
                    onClick={() => {
                        props.data ? handleEditPost() : handleAddPost()
                    }}
                >
                    Enter
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    type="reset"
                    defaultValue="Reset"
                    onClick={handleCloseAddModal}
                >
                    Cancel
                </Button>
            </ReactModal>
        </div>
    )
}

export default AddPostModal
