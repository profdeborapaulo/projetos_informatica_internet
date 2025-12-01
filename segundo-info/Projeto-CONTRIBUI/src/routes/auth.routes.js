const router = require("express").Router();
const authController = require("../controller/autenticacaoController");
const authMiddleware = require("../middleware/autenticacao");

// Validar token
router.get("/validate", authMiddleware, (req, res) => {
  res.status(200).json({ mensagem: "Token válido", user: req.user });
});

// Login
router.post("/login", authController.login);

// Registrar
router.post("/registrar", authController.cadastrar);

module.exports = router;
