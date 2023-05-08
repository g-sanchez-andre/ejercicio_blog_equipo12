const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
// Rutas relacionadas a los comentarios:
// ...
router.post("/crear", articleController.create);
module.exports = router;
