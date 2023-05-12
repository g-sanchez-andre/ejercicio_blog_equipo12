/**
 * Este archivo se puede usar como referencia para crear el controlador de
 * admin del sistema.*/

const { where } = require("sequelize");
const { Article, User } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  const userArticle = await Article.findAll({
    where: { userId: req.user.id },
    order: ["createdAt"],
    include: [
      {
        model: User,
        attributes: ["id", "firstname", "lastname"],
      },
    ],
  });
  res.render("admin", {
    userArticle: userArticle,
  });
}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {
  res.render("createArticle");
}

// Store a newly created resource in storage.
async function store(req, res) {
  const { title, content } = req.body;
  const article = await Article.create({
    title: title,
    content: content,
    userId: req.user.id,
  });
  return res.redirect("/admin");
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const articleId = req.params.id;
  const article = await Article.findByPk(articleId, {
    include: [
      {
        model: User,
        attributes: ["id", "firstname", "lastname"],
      },
    ],
  });
  res.render("editArticle", {
    article: article,
  });
}

// Update the specified resource in storage.
async function update(req, res) {
  const { title, content } = req.body;

  const article = await Article.update(
    {
      title: title,
      content: content,
      userId: req.user.id,
    },
    {
      where: {
        id: req.params.id,
      },
    },
  );
  return res.redirect("/admin");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const articleId = req.params.id;
  await Article.destroy({
    where: {
      id: articleId,
    },
  });
  res.redirect("/admin");
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
