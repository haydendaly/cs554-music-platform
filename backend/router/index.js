const post = require("./postRoute");
const login = require('./login')

const constructorMethod = (app) => {
  app.use("/", login);
  app.use("/api/post", post);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};
5;

module.exports = constructorMethod;
