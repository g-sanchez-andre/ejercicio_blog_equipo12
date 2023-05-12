const { Article, User } = require("../models");

async function showHome(req, res) {
  const article = await Article.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "firstname", "lastname"],
      },
    ],
  });
  res.render("home", {
    article: article,
  });
}

/*============= sin uso =============*/
async function showPanel(req, res) {
  res.render("newArticle");
}

async function showAboutUs(req, res) {
  res.render("aboutUs");
}
/*============= sin uso =============*/
// Otros handlers...
// ...

module.exports = {
  showHome,
  showPanel,
  showAboutUs,
};
