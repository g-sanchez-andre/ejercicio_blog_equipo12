const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const makeUserAvailableInViews = require("../middleware/makeUserAvailableInViews");

router.use("/", ensureAuthenticated);
router.use(makeUserAvailableInViews);
router.get("/", adminController.index);
router.get("/crear", adminController.create);
router.get("/editar/:id", adminController.edit);
router.get("/eliminar/:id", adminController.destroy);
router.post("/crear", adminController.store);
router.post("/editar/:id", adminController.update);
module.exports = router;
