import express from "express";
import medicamentoController from "../controler/medicamentoController.js";

const routes = express.Router();


routes.get("/medicamentos", medicamentoController.listarMedicamentos);
routes.post("/medicamentos", medicamentoController.cadastrarMedicamentos);
routes.delete("/medicamentos/:id", medicamentoController.deletarMedicamento);



export default routes;