const post = require("./postRoute");
const user = require("./userRoute");
const login = require('./login')

const constructorMethod = (app) => {
  app.use("/", login);
  app.use("/api/post", post);
  app.use("/api/user", user);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};
5;

module.exports = constructorMethod;
