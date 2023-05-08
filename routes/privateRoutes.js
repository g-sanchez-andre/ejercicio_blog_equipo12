const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Rutas relacionadas al panel de control (Admin):
// ...
router.get("/", adminController.index);
router.get("/crear", adminController.create);
router.get("/editar/:id", adminController.edit);
router.get("/eliminar/:id", adminController.destroy);

module.exports = router;
