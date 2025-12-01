const router = require("express").Router();
const listaController = require("../controller/listaController");
const auth = require("../middleware/autenticacao");

// itens da lista
router.get("/items/:lista_id", auth, listaController.getItems);

// criar lista
router.post("/criar", auth, listaController.criarLista);

// criar item
router.post("/item", auth, listaController.cadastraItem);

// atualizar item
router.patch("/item/:item_id", auth, listaController.atualizarItem);

// deletar itens
router.delete("/items", auth, listaController.deleteItens);

module.exports = router;
