const post = require("./postRoute");

const constructorMethod = (app) => {
  app.use("/api/post", post);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};
5;

module.exports = constructorMethod;
