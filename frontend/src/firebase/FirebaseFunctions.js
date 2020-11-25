import firebase from "firebase/app";

async function doCreateUserWithEmailAndPassword(email, password, displayName) {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
  await firebase.auth().currentUser.updateProfile({ displayName, displayName });
  let user = firebase.auth().currentUser;
  await firebase.database().ref("/users").child(user.uid).set({
    email: user.email,
    displayName: user.displayName,
  });
}

async function doChangePassword(email, oldPassword, newPassword) {
  let credential = firebase.auth.EmailAuthProvider.credential(email, oldPassword);
  await firebase.auth().currentUser.reauthenticateWithCredential(credential);
  await firebase.auth().currentUser.updatePassword(newPassword);
  await doSignOut();
}

async function doSignInWithEmailAndPassword(email, password) {
  await firebase.auth().signInWithEmailAndPassword(email, password);
}

async function doSocialSignIn(provider) {
  let socialProvider = null;
  if (provider === "google") {
    socialProvider = new firebase.auth.GoogleAuthProvider();
  } else if (provider === "facebook") {
    socialProvider = new firebase.auth.FacebookAuthProvider();
  }
  await firebase.auth().signInWithPopup(socialProvider);
  const user = firebase.auth().currentUser;
  let allUsers = null;
  await firebase
    .database()
    .ref("/users")
    .once("value", function (result) {
      allUsers = result.val();
    });

  if (allUsers) {
    const existingIds = Object.keys(allUsers);
    // users exist but current user is a new user to project
    if (!existingIds.includes(user.uid)) {
      await firebase.database().ref("/users").child(user.uid).set({
        email: user.email,
        displayName: user.displayName,
      });
    }
  } else {
    // no users yet
    await firebase.database().ref("/users").child(user.uid).set({
      email: user.email,
      displayName: user.displayName,
    });
  }
}

async function doPasswordReset(email) {
  await firebase.auth().sendPasswordResetEmail(email);
}

async function doPasswordUpdate(password) {
  await firebase.auth().updatePassword(password);
}

async function doSignOut() {
  await firebase.auth().signOut();
}

export {
  doCreateUserWithEmailAndPassword,
  doSocialSignIn,
  doSignInWithEmailAndPassword,
  doPasswordReset,
  doPasswordUpdate,
  doSignOut,
  doChangePassword,
};
