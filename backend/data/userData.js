const dbCollections = require("../config/collection");
const usersCollection= dbCollections.users;
const { v1: uuidv4 } = require("uuid");

function getValidId(id) {
  if (!id) {
    throw "Given user id is invalid";
  }

  if (typeof id != "object" && typeof id != "string") {
    throw "Provide  post id of type object or string ";
  }

  return id;
}

async function getAllUsers() {
  const users = await usersCollection();
  const allUserData = await users.find({}).toArray();

  if (allUserData === null) {
    throw `No user found in database`;
  }
  return allUserData;
}

async function getAllUserIds(){
  const users = await usersCollection();
  const allUserIds = await users.find({}, {_id:1}).map(function(item){ return item._id; }).toArray();
  return allUserIds;
}

async function getUserById(id) {
  id = getValidId(id);
  const users = await usersCollection();

  let userData = await users.findOne({ _id: id });

  if (!userData) {
    throw `Error :Cannot find user with given id : ${id} into database`;
  }

  return userData;
}

async function createUser(authUserData) {
  
 // auth user data only consists user id, displayName and email
  let userData = {
    _id: authUserData.id,
    displayName: authUserData.displayName,
    email: authUserData.email,
    biography: "",
    websiteUrl: "",
    socialMedia: { facebook: "", instagram:"", twitter:"" },
    photoUrl: authUserData.photoUrl,
    country: "United States",
    photoData: ""
  };

  let users = await usersCollection();

  let newUser = await users.insertOne(userData);

  if (newUser.insertedCount === 0) {
    throw `Error : Unable to add user into database`;
  }

  return await this.getUserById(newUser.insertedId);
}
async function updateUser(userId, updatedUserData) {
  
  let users = await usersCollection();

  let updatedUser = await users.updateOne({ _id: userId }, { $set: updatedUserData });

  if (!updatedUser.modifiedCount && !updatedUser.matchedCount) {
    throw `Error : Unable to update user with id : ${id} into database`;
  }

  return await this.getUserById(userId);
}

async function deleteUser(id) {
  id = getValidId(id);

  const users = await usersCollection();

  let removedUser = await users.removeOne({ _id: id });

  if (removedUser.deletedCount === 0) {
    throw `Error : Unable to delete user with id : ${id} from database`;
  }

  return true;
}

module.exports = {
  getAllUsers,
  getAllUserIds,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
