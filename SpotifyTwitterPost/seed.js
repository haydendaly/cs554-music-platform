const dbConnection = require("../config/connection");
const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

  console.log("Done seeding database");
  await db.serverConfig.close();
};

main().catch(console.log);
