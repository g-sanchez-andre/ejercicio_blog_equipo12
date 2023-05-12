const { Article, User, Comment } = require("../models");

// Display a listing of the resource.

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
async function create(req, res) {}

// Store a newly created resource in storage.
async function storeComment(req, res) {
  const { content } = req.body;
  const articleId = req.params.id;
  const comment = await Comment.create({
    content: content,
    articleId: articleId,
    userId: req.user.id,
  });
  console.log(articleId);
  return res.redirect(`/articulos/${articleId}`);
}

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
  storeComment,
  edit,
  update,
  destroy,
};
