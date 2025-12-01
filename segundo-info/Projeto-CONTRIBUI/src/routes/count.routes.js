const router = require("express").Router();
const contaController = require("../controller/contaController");
const auth = require("../middleware/autenticacao");

// criar conta
router.post("/criar", auth, contaController.criarConta);

module.exports = router;
