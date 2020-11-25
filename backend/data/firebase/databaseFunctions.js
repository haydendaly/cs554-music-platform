let firebase = require("firebase/app");
require("firebase/database");

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC3zNGwnyJlCnRkVxHrRsO0COOyaG4QDBQ",
  authDomain: "cs554-project-spotify.firebaseapp.com",
  databaseURL: "https://cs554-project-spotify.firebaseio.com",
  projectId: "cs554-project-spotify",
  storageBucket: "cs554-project-spotify.appspot.com",
  messagingSenderId: "823082822734",
  appId: "1:823082822734:web:5dd15fc823b7b9162be71f",
});

const database = firebase.database();
const usersRef = database.ref("/users");
const postsRef = database.ref("/posts");

// add one child data in a Ref
async function addData(data, Ref) {
  const key = await Ref.push().key;
  await Ref.child(key).set(data);
  return key;
}

// update on child data in a Ref
async function updateData(key, updatedData, Ref) {
  await Ref.child(key).update(updatedData);
  return true;
}

// delete one child data in a Ref
async function deleteData(key, Ref) {
  await Ref.child(key).remove();
  return true;
}

// get one child data in given Ref
async function getDataByKey(key, Ref) {
  let data;

  await Ref.child(key).once("value", function (result) {
    //console.log(result.val());
    data = result.val();
  });

  return data;
}

// get all data in a Ref
async function getDataInRef(Ref) {
  let data;
  await Ref.once("value", function (result) {
    data = result.val();
  });

  return data;
}

module.exports = {
  // async addNewUser(userData) {
  //   return await addData(userData, usersRef);
  // },

  async updateUserData(userId, updateUserData) {
    await updateData(userId, updateUserData, usersRef);
    return this.getUserData(userId);
  },

  async deleteUser(userId) {
    return await deleteData(userId, usersRef);
  },

  async getUserData(userId) {
    return await getDataByKey(userId, usersRef);
  },

  async getAllUsers() {
    return await getDataInRef(usersRef);
  },

  async addNewPost(postData) {
    return addData(postData, postsRef);
  },

  async updatePostData(postId, updatePostData) {
    await updateData(postId, updatePostData, postsRef);
    return this.getPostData(postId);
  },

  async deletePost(postId) {
    return await deleteData(postId, postsRef);
  },

  async getPostData(postId) {
    return await getDataByKey(postId, postsRef);
  },

  async getAllPosts() {
    return await getDataInRef(postsRef);
  },
};
