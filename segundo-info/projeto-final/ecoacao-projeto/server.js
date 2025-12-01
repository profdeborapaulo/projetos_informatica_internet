const express = require("express");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(__dirname));
app.use("/uploads", express.static("uploads"));

// Garantir que a pasta uploads existe
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

// Configuração do Multer (upload de imagens)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

// Rota GET para exibir denúncias
app.get("/reports", (req, res) => {
    const db = JSON.parse(fs.readFileSync("db.json"));
    res.json(db.reports);
});

// Rota POST para enviar denúncia
app.post("/report", upload.single("foto"), (req, res) => {
    const db = JSON.parse(fs.readFileSync("db.json"));

    const novaDenuncia = {
        id: Date.now(),
        descricao: req.body.descricao,
        localizacao: req.body.localizacao,
        imagemUrl: "/uploads/" + req.file.filename
    };

    db.reports.push(novaDenuncia);
    fs.writeFileSync("db.json", JSON.stringify(db, null, 2));

    res.json({ status: "ok" });
});
    app.get("/sobre", (req, res) => {
        res.sendFile(path.join(__dirname, "sobre.html"));
});

    app.get("/contato", (req, res) => {
        res.sendFile(path.join(__dirname, "contato.html"));
});

    app.get("/como-denunciar", (req, res) => {
        res.sendFile(path.join(__dirname, "como-denunciar.html"));
});


// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
