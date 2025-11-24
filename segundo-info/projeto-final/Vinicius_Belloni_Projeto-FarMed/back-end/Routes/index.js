import express from "express";
import remedio from "./remediosRoutes.js";
import medicamento from "./medicamentosRoutes.js";
import categorias from "./categoriasRoutes.js";
import login from "./loginRoutes.js"
import cors from "cors"

// const cors = require('cors');


const routes = (app) =>{
    app.route("/").get((req, res) => res.status(200).send("Funciono"));

    const corsOptions = {
      
    origin: 'http://127.0.0.1:5500', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    };
    app.use(cors(corsOptions));


    app.use(express.json(), remedio, medicamento, categorias, login);
  
}

export default routes;