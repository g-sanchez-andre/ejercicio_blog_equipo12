const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// Rutas relacionadas a los usuarios:
// ...

// router.get("/", userController.index);
router.get("/registro", userController.create);
router.post("/registro", userController.store);
router.get("/login", userController.show);
router.post("/logout", authController.logout);
router.post("/login", authController.login);

// router.get("/:id/editar", userController.edit);
// router.patch("/:id", userController.update);
// router.delete("/:id", userController.destroy);

module.exports = router;
