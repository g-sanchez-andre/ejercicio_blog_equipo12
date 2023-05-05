const express = require("express");
const router = express.Router();

// Rutas relacionadas a la parte pública del sitio web:
// ...
router.get("/", (req, res) => {
  res.render("home");
});
module.exports = router;
