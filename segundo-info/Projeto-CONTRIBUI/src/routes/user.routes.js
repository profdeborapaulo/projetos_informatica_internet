const router = require("express").Router();
const userController = require("../controller/usuarioController");
const auth = require("../middleware/autenticacao");

// /usuario/:id
router.get("/:usuario_id", auth, userController.getDadosUsuario);

// alterar senha
router.post("/alterarSenha", auth, userController.alterarSenhaUsuario);

module.exports = router;
