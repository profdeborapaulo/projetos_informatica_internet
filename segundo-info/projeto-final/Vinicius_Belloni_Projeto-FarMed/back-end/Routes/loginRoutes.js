import express from "express";
import loginController from "../controler/loginController.js";

const routes = express.Router();


routes.get("/login", loginController.listarLogins);
routes.post("/login", loginController.cadastrarLogins);
routes.post("/logando", loginController.loginCorreto);
routes.get("/login/:id", loginController.listarLoginsPorId)
routes.post("/login/:id", loginController.atualizarRemedios);
routes.delete("/login/:id", loginController.deletarLogin);
routes.put("/login/:id", loginController.atualizarLogin);
routes.get("/login/:nome", loginController.LoginESenha);


export default routes;