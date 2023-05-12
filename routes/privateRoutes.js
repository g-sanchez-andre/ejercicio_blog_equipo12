const express = require("express");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const router = express.Router();
const adminController = require("../controllers/adminController");

// ...
// Rutas relacionadas al panel de control (Admin):
router.use("/", ensureAuthenticated);
router.get("/", adminController.index);
router.get("/crear", adminController.create);
router.get("/editar/:id", adminController.edit);
router.get("/eliminar/:id", adminController.destroy);
router.post("/crear", adminController.store);
router.post("/editar/:id", adminController.update);
module.exports = router;
