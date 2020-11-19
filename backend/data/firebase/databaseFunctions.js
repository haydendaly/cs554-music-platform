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

module.exports = {
  async addNewUser(name, email) {
    const userId = await usersRef.push().key;
    await usersRef.child(userId).set({
      username: name,
      email: email,
    });
    return;
  },

  async updateUserData(userId, name, email) {
    const newUserData = {
      username: name,
      email: email,
    };
    await usersRef.child(userId).update(newUserData);
    return;
  },

  async deleteUser(userId) {
    await usersRef.child(userId).remove();
    return;
  },

  async getUserData(userId) {
    let data;
    await usersRef.child(userId).on("value", function (snapshot) {
      console.log("snapshot.val() is", snapshot.val());

      data = snapshot.val();
      console.log("data is", data);
    });
    return data;
  },
};
