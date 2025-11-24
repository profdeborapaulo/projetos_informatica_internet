import "dotenv/config"
import app from "./back-end/app.js"

const PORT = 3000;

const rotas = {
    "/": "Back-ed",
    "/Categorias":"Entrei na area de categoria"
};



app.listen(PORT, () =>{
    console.log("Servidor escutando...");   
});

