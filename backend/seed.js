const dbConnection = require("./config/connection");
const data = require("./data");
const userData = data.users;
const postData = data.post;
const path = require('path');
const bluebird = require('bluebird');
const fs = bluebird.promisifyAll(require('fs'));

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

  try{
    let userPhotoDir = path.join(__dirname, '.', 'seedPhotos')

    const user1 = {
      id: "GwczNGcQ7qbciQRKC1EFmCIKmP22",
      displayName: "Miranda Zou",
      email: "xzou3@stevens.edu"
    };

    const miranda = await userData.createUser(user1);
    const mirandaPhoto = {
      data: await fs.readFileAsync(path.join(userPhotoDir, 'miranda.jpg')),
      type: 'image/jpeg'
    }

    await userData.updateUser(miranda._id, { photoData: mirandaPhoto});
    
    const mirandaPost1 = {
      userId: miranda._id,
      text: "I like this song",
      commentsArray: [],
      likesArray: [],
    }

    await postData.createPost(mirandaPost1);


    const user2 = {
      id: "ld8SZZOXptQU8FM3EpRFQraf9M42",
      displayName: "Mahvish Syed",
      email: "msyed6@stevens.edu" 
    };

    const mahvish = await userData.createUser(user2);
    

    const user3 = {
      id: "J0MCtGX1bjbKfXmzTtmbMc0wq5Q2",
      displayName: "Priya Gupta",
      email:"pgupta14@stevens.edu"
    };

    const priya = await userData.createUser(user3);
   
    const user4 = {
      id: "MYhph0DqDPVQMNl5itMpBPtROin2",
      displayName: "Hayden Daly",
      email: "hdaly1@stevens.edu" 
    };

    const hayden = await userData.createUser(user4);
    
    const user5 = {
      id: "GS4WlRECQCbnTAp126LFRFxyfSG3",
      displayName: "Kyle Gensheimer",
      email: "kylegensheimer@gmail.com"
    };

    const kyle = await userData.createUser(user5);
    

    console.log("Done seeding database");
    await db.serverConfig.close();
  
  } catch(e){
    console.log(e);
  }
};

main().catch(console.log);
