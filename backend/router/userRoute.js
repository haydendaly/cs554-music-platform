const express = require("express");
const router = express.Router();
const data = require("../data");
const usersData = data.users;
const upload = require('../config/upload');
const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

router.get("/", async (req, res) => {
  try {
    let allUsers = await usersData.getAllUsers()
    res.json(allUsers);
  } catch (error) {
    res.status(404).json({ error: "Users not found" });
  }
});

router.get("/ids", async (req, res) => {
  try {
    let allUserIds = await usersData.getAllUserIds()
    res.json(allUserIds);
  } catch (error) {
    res.status(404).json({ error: "Users not found" });
  }
});

router.get("/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(404).json({ error: "User Id missing" });
    return;
  }

  try {
    let user = await usersData.getUserById(req.params.id)
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: "Post not found" });
  }
});

router.post("/create", async (req, res) => {
  if (
    !req.body ||
    !req.body.id ||
    !req.body.displayName||
    !req.body.email 
  ) {
    res.status(404).json({ error: "Must supply all fields." });
    return;
  }

  let userParams = req.body;
  try {
    let newUser = await usersData.createUser(userParams)    
    res.json(newUser);
  } catch (error) {
    res.status(404).json({ error: "Cannot add new user" });
  }
});

router.delete("/:id" , async(req, res) => {
   if(!req.params.id){
    res.status(404).json({ error: "Must supply user Id." });
    return;
   }

   try {
     let deleted = await usersData.deleteUser(req.params.id)
     if(deleted){
       res.json({deleted : "true"})
     }    
   } catch (error) {
    res.status(404).json({ error:  `Cannot delete user : ${error}` });
   }

})

// update user
router.patch("/:id", async (req, res) => {
  if (!req.params.id || !req.body || Object.keys(req.body).length === 0) {
    res.status(404).json({
      error: "Must provide at least one field in request body.",
    });
    return;
  }

  let updatedUserData = req.body;
  try {
    await usersData.getUserById(req.params.id)
  }catch(e){
    res.status(404).json({
      error: "No user found for given id.",
    });
    return;
  }

  try {
    // validate all fields - TBD

    let updatedUser = await usersData.updateUser(req.params.id, updatedUserData)
    res.json(updatedUser);
  } catch (error) {
    res.status(404).json({ error: "Cannot update user." });
  }
});

router.post("/photo/:id", upload.single('image'), async(req, res)=>{
  if (!req.params.id){
    res.status(404).json({ error: "Please provide user id." });
    return;
  }
  
  if (req.file) {
    let data = await fs.readFile(path.join(__dirname, '..', 'uploads', req.file.filename))
    let type = req.file.mimetype
    
    const photoData = { photoData:
      {data: data,
      type: type}
    }

    try{
      await usersData.updateUser(req.params.id, photoData)
      res.status(200).json({message: 'Photo updated'})

    }catch(e){
      res.status(404).json({error: e})
    }

  }
});

router.get("/photo/:id", async(req, res) =>{
  if (!req.params.id){
    res.status(404).json({ error: "Please provide user id." });
    return;
  }

  try{
    const user = await usersData.getUserById(req.params.id)
    const photoData = user.photoData;
    if (photoData){    
      res.contentType(photoData.type);
      res.send(photoData.data.buffer);
    } else{
      res.sendFile(path.join(__dirname, '..', 'public', 'img', 'default_profile.jpeg'));
    }
  
  } catch(e){
    res.status(400).json({error: e });
  }

})


module.exports = router;
