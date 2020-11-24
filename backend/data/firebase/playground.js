const db = require("./databaseFunctions");

async function main() {
  const newUser = { username: "user1", email: "user1@stevens.edu", posts: [] };
  const newUserId = await db.addNewUser(newUser);
  const updateData = { email: "user1update@stevens.edu" };
  const userData = await db.updateUserData(newUserId, updateData);
  //const success2 = await db.deleteUser(newUserId);

  const allUsers = await db.getAllUsers();
  //console.log(allUsers);

  const newPost = { title: "post1", content: "post1content" };
  const newPostId = await db.addNewPost(newPost);

  const currentUserData = await db.getUserData(newUserId);

  let currentPosts = currentUserData.posts;
  if (currentPosts) {
    currentPosts.push(newPostId);
  } else {
    currentPosts = [newPostId];
  }
  const success3 = await db.updateUserData(newUserId, { posts: currentPosts });

  const updatedUserData = await db.getUserData(newUserId);
}

main();
