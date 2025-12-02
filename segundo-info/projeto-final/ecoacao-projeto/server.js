// server.js (versão recomendada)
const express = require("express");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (HTML / CSS / JS)
app.use(express.static(__dirname));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Garantir que a pasta uploads exista
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

// Multer config (limite e filtro de arquivos)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    // sanitiza nome do arquivo simples
    const safeName = file.originalname.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9\.\-_]/g, "");
    cb(null, Date.now() + "-" + safeName);
  }
});

function fileFilter(req, file, cb) {
  // aceita apenas imagens
  const allowed = /jpeg|jpg|png|gif|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) cb(null, true);
  else cb(new Error("Apenas imagens são permitidas."));
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Leitura segura de db.json
function readDB() {
  try {
    if (!fs.existsSync("db.json")) {
      fs.writeFileSync("db.json", JSON.stringify({ reports: [] }, null, 2));
    }
    const raw = fs.readFileSync("db.json", "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Erro lendo db.json:", err);
    return { reports: [] };
  }
}

function writeDB(db) {
  fs.writeFileSync("db.json", JSON.stringify(db, null, 2));
}

// GET /reports
app.get("/reports", (req, res) => {
  const db = readDB();
  // garante que retorna array
  res.json(db.reports || []);
});

// POST /report (campo 'foto' no form)
app.post("/report", upload.single("foto"), (req, res) => {
  try {
    const db = readDB();

    // valida campos mínimos
    const descricao = (req.body.descricao || "").trim();
    const localizacao = (req.body.localizacao || "").trim();

    if (!descricao || !localizacao) {
      return res.status(400).json({ status: "error", message: "Descrição e localização são obrigatórias." });
    }

    const novaDenuncia = {
      id: Date.now(),
      descricao,
      localizacao,
      imagemUrl: req.file ? "/uploads/" + req.file.filename : null,
      createdAt: new Date().toISOString()
    };

    db.reports.unshift(novaDenuncia);
    writeDB(db);

    return res.json({ status: "ok" });
  } catch (e) {
    console.error("Erro ao processar denúncia:", e);
    return res.status(500).json({ status: "error", message: "Erro interno do servidor." });
  }
});

// Rotas para páginas estáticas (opcionais)
app.get("/sobre", (req, res) => res.sendFile(path.join(__dirname, "sobre.html")));
app.get("/contato", (req, res) => res.sendFile(path.join(__dirname, "contato.html")));
app.get("/como-denunciar", (req, res) => res.sendFile(path.join(__dirname, "como-denunciar.html")));

// Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
