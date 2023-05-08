const { Article, User, Comment } = require("../models");

// Display a listing of the resource.
/*async function index(req, res) {
  const article = await Article.findAll();
  article.forEach((article) => {
    console.log(article.id, article.title);
  });
  res.render("article", {
    article: article,
  });
}
*/
// Display the specified resource.
async function show(req, res) {
  const articleId = req.params.id;
  const article = await Article.findByPk(articleId, {
    include: [
      {
        model: User,
        attributes: ["id", "firstname", "lastname"],
      },
    ],
  });
  const comment = await Comment.findAll({
    where: {
      articleId: articleId,
    },
    include: { model: User },
  });
  res.render("article", {
    article: article,
    comment: comment,
  });
}

// Show the form for creating a new resource
async function create(req, res) {
  const { content, name, articleId } = req.body;

  console.log(articleId);
  /*const content = req.body.content;
  const articleId = req.params.id;
  const userId = req.body.name;*/
  nameArray = name.split(" ");

  const comment = await Comment.create({
    content: content,
    articleId: articleId,
    userId: userIdprueba(nameArray[0], nameArray[1]),
  });
  console.log(req.body);
  console.log(comment);
}
async function userIdprueba(nombre, apellido) {
  const userid = await User.findOne({
    where: {
      firstname: nombre,
      lastname: apellido,
    },
  });
  return userid.id;
}
userIdprueba("Anni Lugo", "Miguel Laboy");
// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  //index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
