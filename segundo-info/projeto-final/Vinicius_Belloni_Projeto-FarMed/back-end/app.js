import express from "express";
import conectaNaDataBase from "./config/dbConnect.js";
import routes  from "./Routes/index.js";

const conexao = await conectaNaDataBase();
conexao.on("error", (erro) =>{
    console.error("Não conectado", erro);
});

conexao.once("open", () =>{
    console.log("Conectado");
    
})


const app = express();
routes(app);




export default app