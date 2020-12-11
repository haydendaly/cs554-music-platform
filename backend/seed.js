const dbConnection = require("./config/connection");
const data = require("./data");
const userData = data.users;

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

  try{

    const user1 = {
      id: "GwczNGcQ7qbciQRKC1EFmCIKmP22",
      displayName: "Miranda Zou",
      email: "xzou3@stevens.edu"
    };

    const createdUser1 = await userData.createUser(user1);
    console.log(createdUser1);

    const updatedUser1 = await userData.updateUser(createdUser1._id, 
      {displayName: "Xianqing Zou",
      socialMedia: {
        facebook: 'https://www.facebook.com/xianqing.zou/',
        instagram: 'https://www.instagram.com/miranda.zou/',
        twitter:""
      }});
    console.log(updatedUser1);

    const user2 = {
      id: "6XpHCSfFPWP6xDDy5h1SNowhCBm2",
      displayName: "Mahi Sayyed",
      email:"mahvishsyed15@gmail.com"
    };

    const createdUser2 = await userData.createUser(user2);
    console.log(createdUser2);

    const user3 = {
      id: "J0MCtGX1bjbKfXmzTtmbMc0wq5Q2",
      displayName: "Priya",
      email:"pgupta14@stevens.edu"
    };

    const createdUser3 = await userData.createUser(user3);
    console.log(createdUser3);

    const user4 = {
      id: "MYhph0DqDPVQMNl5itMpBPtROin2",
      displayName: "Hayden Daly",
      email: "hdaly1@stevens.edu" 
    };

    const createdUser4 = await userData.createUser(user4);
    console.log(createdUser4);

    const user5 = {
      id: "ld8SZZOXptQU8FM3EpRFQraf9M42",
      displayName: "Mahvish Syed",
      email: "msyed6@stevens.edu" 
    };

    const createdUser5 = await userData.createUser(user5);
    console.log(createdUser5);

    const allUsers = await userData.getAllUsers();
    console.log(allUsers);

    console.log("Done seeding database");
    await db.serverConfig.close();
  } catch(e){
    console.log(e);
  }
};

main().catch(console.log);
