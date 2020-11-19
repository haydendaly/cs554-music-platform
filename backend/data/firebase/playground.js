const db = require("./databaseFunctions");

async function main() {
  //await db.addNewUser("miranda", "zouxianqing@gmail.com");
  // await db.deleteUser("-MMXTsHB_daDRWTqYMUi");
  const userData = await db.getUserData("-MMXYQk9-2LhDhavRVqI");
  console.log(userData);
}

main();
