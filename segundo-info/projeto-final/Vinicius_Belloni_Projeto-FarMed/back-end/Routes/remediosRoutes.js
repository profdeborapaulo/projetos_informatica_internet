import express from "express";
import remedioController from "../controler/remedioController.js";

const routes = express.Router();

routes.get("/remedio", remedioController.listarRemedios);
routes.get("/remedio/busca", remedioController.buscarRemedio);
routes.get("/remedio/:id", remedioController.listarRemediosPorId);
routes.post("/remedio", remedioController.cadastrarRemedio);
routes.put("/remedio/:id", remedioController.atualizarRemedios);


export default routes;