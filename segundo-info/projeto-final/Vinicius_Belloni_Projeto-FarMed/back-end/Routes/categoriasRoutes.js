import express from "express";
import categoriaController from "../controler/categoriasController.js";

const routes = express.Router();


routes.get("/categorias", categoriaController.listarcategoria);
routes.post("/categorias", categoriaController.cadastrarCategoria);
routes.put("/categorias/:id", categoriaController.atualizarCategorias);
routes.get("/categorias/:nome", categoriaController.medicamentosDeMesmaCategoria);
// routes.get("/categorias/:nome", categoriaController.categoriaPorNome);




export default routes;