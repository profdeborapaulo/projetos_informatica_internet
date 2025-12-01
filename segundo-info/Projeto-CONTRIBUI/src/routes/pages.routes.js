const router = require("express").Router();
const baseController = require("../controller/baseController");

router.get("/", baseController.index);
router.get("/login", baseController.loginPage);
router.get("/registrar", baseController.registrarPage);
router.get("/dashboard", baseController.dashboardPage);
router.get("/perfil", baseController.perfilPage);

module.exports = router;
