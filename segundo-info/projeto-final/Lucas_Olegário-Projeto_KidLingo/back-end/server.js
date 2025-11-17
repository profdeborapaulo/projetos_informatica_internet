
import express from "express";
import cors from "cors";
import { db } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// Busca TODAS as lições de um idioma
app.get("/licoes/:idioma", (req, res) => {
  const idioma = req.params.idioma;
  
  const query = "SELECT * FROM licoes WHERE idioma = ?";
  db.query(query, [idioma], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar lições" });
    }
    res.json(results);
  });
});

// Busca uma lição específica pelo ID 
app.get("/licao/:id", (req, res) => {
  const id = req.params.id;
  
  const query = "SELECT * FROM licoes WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar a lição" });
    }
    res.json(results[0] || {});
  });
});

// Busca a atividade de uma lição específica 
app.get("/atividade/:licao_id", (req, res) => {
  const licaoId = req.params.licao_id;
  
  const query = "SELECT * FROM atividades WHERE licao_id = ?";
  db.query(query, [licaoId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar atividade" });
    }
    res.json(results[0] || {}); 
  });
});

// Busca o total de lições por idioma 
app.get("/licoes/total/:idioma", (req, res) => {
  const idioma = req.params.idioma;
  
  const query = "SELECT COUNT(id) AS total FROM licoes WHERE idioma = ?";
  db.query(query, [idioma], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar total de lições" });
    }
    res.json(results[0] || { total: 0 });
  });
});

// Busca todas as definições de conquistas)
app.get("/conquistas", (req, res) => {
  const query = "SELECT * FROM conquistas";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar conquistas" });
    }
    res.json(results);
  });
});

// Busca o progresso 
app.get("/progresso/simulado", (req, res) => {
  const query = "SELECT * FROM progresso WHERE usuario_simulado_id = 1";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar progresso simulado" });
    }
    res.json(results[0] || {});
  });
});

// Atualiza tempo, pontos e lições completadas
app.post("/progresso/tempo", (req, res) => {
  const { tempo_total_seg, pontos_total, licoes_completadas } = req.body;

  const query = "UPDATE progresso SET tempo_total_seg = ?, pontos_total = ?, licoes_completadas = ? WHERE usuario_simulado_id = 1";
  
  db.query(query, [tempo_total_seg, pontos_total, licoes_completadas], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao atualizar progresso (tempo/pontos)" });
    }
    res.json({ message: "Progresso atualizado com sucesso" });
  });
});

// Atualiza conquistas
app.post("/progresso/conquista", (req, res) => {
  const { conquistas_desbloqueadas } = req.body;

  const query = "UPDATE progresso SET conquistas_desbloqueadas = ? WHERE usuario_simulado_id = 1";
  
  db.query(query, [JSON.stringify(conquistas_desbloqueadas)], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao atualizar conquistas" });
    }
    res.json({ message: "Conquistas atualizadas com sucesso" });
  });
});

app.listen(3000, () => {
  console.log("Servidor KidLingo rodando na porta 3000.");
});