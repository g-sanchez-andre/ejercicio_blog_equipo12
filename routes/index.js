const userRoutes = require("./userRoutes");
const articleRoutes = require("./articleRoutes");
const commentRoutes = require("./commentRoutes");
const publicRoutes = require("./publicRoutes");
const privateRoutes = require("./privateRoutes");

module.exports = (app) => {
  app.use("/user", userRoutes);
  app.use("/articulos", articleRoutes);
  app.use("/", publicRoutes);
  app.use("/admin", privateRoutes);
  // app.use("/articulos", commentRoutes);
};
