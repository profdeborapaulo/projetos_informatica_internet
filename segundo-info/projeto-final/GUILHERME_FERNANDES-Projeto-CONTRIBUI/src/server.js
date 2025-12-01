// Camada de pacotes
require("dotenv").config();
const express = require("express"); 
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const path = require("path");

// Indicando que vou usar como visualização o framework 'EJS' e que estão na pasta ./views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Precisa disso para poder ler dados em json, posso usar em alguns momentos
app.use(express.json());
// Precisa disso para poder receber os dados do formulario de forma que o node possa ler
app.use(express.urlencoded({ extended: true }));

// Para poder processar coockis (EStou usando para armezenar o token)
app.use(cookieParser());

// Indica ao Express que ele deve usar está pasta para procurar arquivos mockados de acesso publico
app.use(express.static("public"));

// Criei um arquivo para rotas, assim deixa o arquivo origem mais limpo
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// Iniciando o servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});