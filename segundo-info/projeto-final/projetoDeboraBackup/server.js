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
    // Adicionado tratamento de erro caso o db.json não exista/seja inválido
    try {
        const db = JSON.parse(fs.readFileSync("db.json"));
        res.json(db.reports || []);
    } catch (e) {
        // Se o arquivo não existir ou for inválido, retorna array vazio e cria um novo
        if (e.code === 'ENOENT') {
            fs.writeFileSync("db.json", JSON.stringify({ reports: [] }, null, 2));
            return res.json([]);
        }
        res.status(500).json({ status: "error", message: "Erro ao carregar dados." });
    }
});

// Rota POST para enviar denúncia
app.post("/report", upload.single("foto"), (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync("db.json"));

        const novaDenuncia = {
            id: Date.now(),
            descricao: req.body.descricao,
            localizacao: req.body.localizacao,
            // Acessa o nome do arquivo, verifica se existe
            imagemUrl: req.file ? "/uploads/" + req.file.filename : null 
        };

        db.reports.unshift(novaDenuncia); // Adiciona no início para aparecer na frente
        fs.writeFileSync("db.json", JSON.stringify(db, null, 2));

        res.json({ status: "ok" });
    } catch (e) {
        console.error("Erro ao processar denúncia:", e);
        res.status(500).json({ status: "error", message: "Erro interno do servidor." });
    }
});

// Funções para servir páginas estáticas e tratamento de erro
function serveStaticPage(pageName, req, res) {
    const filePath = path.join(__dirname, pageName);
    fs.promises.access(filePath, fs.constants.F_OK)
        .then(() => {
            res.sendFile(filePath);
        })
        .catch(() => {
            // Se o arquivo não for encontrado, retorna 404
            res.status(404).send('Página não encontrada');
        });
}

app.get("/sobre", (req, res) => {
    serveStaticPage("sobre.html", req, res);
});

app.get("/contato", (req, res) => {
    serveStaticPage("contato.html", req, res);
});

app.get("/como-denunciar", (req, res) => {
    serveStaticPage("como-denunciar.html", req, res);
});


// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});