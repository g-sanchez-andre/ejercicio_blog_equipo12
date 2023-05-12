const articleController = require("../controllers/articleController");

const express = require("express");
const router = express.Router();

router.get("/crear", articleController.create);
router.get("/:id", articleController.show);
router.get("/:id/editar", articleController.edit);
router.patch("/:id", articleController.update);
router.delete("/:id", articleController.destroy);
router.post("/:id", articleController.storeComment);
//router.get("/", articleController.index);
// router.post("/", articleController.store);

module.exports = router;
