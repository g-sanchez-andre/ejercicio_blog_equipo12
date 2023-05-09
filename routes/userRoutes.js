const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Rutas relacionadas a los usuarios:
// ...

router.get("/", userController.index);
router.get("/registro", userController.create);
router.post("/registro", userController.store);
router.get("/login", userController.create);
router.post("/login", userController.store);
router.get("/logout", userController.create);

router.get("/:id", userController.show);
router.get("/:id/editar", userController.edit);
router.patch("/:id", userController.update);
router.delete("/:id", userController.destroy);

module.exports = router;
