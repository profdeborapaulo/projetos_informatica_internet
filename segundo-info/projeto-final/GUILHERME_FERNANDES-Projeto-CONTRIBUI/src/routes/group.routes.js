const router = require("express").Router();
const gruposController = require("../controller/gruposController");
const auth = require("../middleware/autenticacao");

// listar grupos do usuário
router.get("/listar/:usuario_id", auth, gruposController.listarGrupos);

// obter um grupo
router.get("/:grupo_id", auth, gruposController.getGrupo);

// listas e contas dentro do grupo
router.get("/listasEContas/:grupo_id", auth, gruposController.getListasEContas);

// entrar no grupo via sharecode
router.post("/entrar", auth, gruposController.entrarGrupo);

// criar grupo
router.post("/criar", auth, gruposController.criarGrupo);

module.exports = router;
