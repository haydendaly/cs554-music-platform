import firebase from 'firebase/app'
import axios from 'axios'

async function doCreateUserWithEmailAndPassword(email, password, displayName) {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    await firebase
        .auth()
        .currentUser.updateProfile({ displayName: displayName })
    let user = firebase.auth().currentUser
    // add user info to backend
    const newUser = {
        id: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoUrl: user.photoURL,
    }
    try {
        await axios.post('http://localhost:3000/api/user/create', newUser)
    } catch (e) {
        console.log(e)
    }
}

async function doChangePassword(email, oldPassword, newPassword) {
    let credential = firebase.auth.EmailAuthProvider.credential(
        email,
        oldPassword
    )
    await firebase.auth().currentUser.reauthenticateWithCredential(credential)
    await firebase.auth().currentUser.updatePassword(newPassword)
    await doSignOut()
}

async function doSignInWithEmailAndPassword(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    const user = firebase.auth().currentUser
    let { data } = await axios.get('http://localhost:3000/api/user/ids')
    // add user to backend if information doesn't exist
    if (!data.includes(user.uid)) {
        const newUser = {
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoUrl: user.photoURL,
        }
        try {
            await axios.post('http://localhost:3000/api/user/create', newUser)
        } catch (e) {
            console.log(e)
        }
    }
}

async function doSocialSignIn(provider) {
    let socialProvider = null
    if (provider === 'google') {
        socialProvider = new firebase.auth.GoogleAuthProvider()
    } else if (provider === 'facebook') {
        socialProvider = new firebase.auth.FacebookAuthProvider()
    }
    await firebase.auth().signInWithPopup(socialProvider)
    const user = firebase.auth().currentUser
    let { data } = await axios.get('http://localhost:3000/api/user/ids')
    if (!data.includes(user.uid)) {
        const newUser = {
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoUrl: user.photoURL,
        }
        try {
            await axios.post('http://localhost:3000/api/user/create', newUser)
        } catch (e) {
            console.log(e)
        }
    }
}

async function doPasswordReset(email) {
    await firebase.auth().sendPasswordResetEmail(email)
}

async function doPasswordUpdate(password) {
    await firebase.auth().updatePassword(password)
}

async function doSignOut() {
    await firebase.auth().signOut()
}

export {
    doCreateUserWithEmailAndPassword,
    doSocialSignIn,
    doSignInWithEmailAndPassword,
    doPasswordReset,
    doPasswordUpdate,
    doSignOut,
    doChangePassword,
}
