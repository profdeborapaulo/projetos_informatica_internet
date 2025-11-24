/*
 * ========================================
 * SERVIDOR PRINCIPAL DA PLATAFORMA SCIENTIA
 * ========================================
 */

// --- 1. IMPORTAÇÕES DE PACOTES ---
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

// --- 2. IMPORTAÇÕES LOCAIS ---
const pool = require('./db'); // A nossa ligação ao MySQL
const authMiddleware = require('./authMiddleware'); // O nosso "porteiro" de segurança

// --- 3. INICIALIZAÇÃO DO APP ---
const app = express();
const PORTA = process.env.PORTA_API || 3000;

// --- 4. MIDDLEWARES GLOBAIS ---
// Ensinar o Express a "ler" JSON e a permitir pedidos de outros domínios (CORS)
app.use(cors());
app.use(express.json());

// --- 5. CONFIGURAÇÃO DO MULTER (UPLOADS) ---
// Define onde os ficheiros vão ser guardados
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Usa a pasta 'uploads'
    },
    filename: function (req, file, cb) {
        // Cria um nome único para evitar sobrepor ficheiros
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// --- 6. ROTAS DA API ---

/* --- ROTAS DE AUTENTICAÇÃO (Módulo 1) --- */

// ROTA: POST /api/usuarios/registrar
app.post('/api/usuarios/registrar', async (req, res) => {
    try {
        const { nome, afiliacao, area_especializacao, biografia, email, senha } = req.body;
        if (!nome || !email || !senha) {
            return res.status(400).json({ mensagem: 'Nome, e-mail e senha são obrigatórios.' });
        }
        const [usuariosExistentes] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
        if (usuariosExistentes.length > 0) {
            return res.status(400).json({ mensagem: 'Este e-mail já está registado.' });
        }
        const senhaHash = await bcrypt.hash(senha, 10);
        const [resultado] = await pool.query(
            `INSERT INTO usuarios (nome, afiliacao, area_especializacao, biografia, email, senha_hash)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nome, afiliacao, area_especializacao, biografia, email, senhaHash]
        );
        res.status(201).json({ mensagem: 'Utilizador criado com sucesso!', usuarioId: resultado.insertId });
    } catch (error) {
        console.error('Erro no registo:', error);
        res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
});

// ROTA: POST /api/usuarios/login
app.post('/api/usuarios/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios.' });
        }
        const [usuarios] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (usuarios.length === 0) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
        }
        const usuario = usuarios[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);
        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
        }
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, nome: usuario.nome },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );
        res.status(200).json({ mensagem: 'Login bem-sucedido!', token: token });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
});


/* --- ROTAS DE DATASETS (Módulos 2 & 3) --- */

// ROTA: POST /api/datasets/upload (Protegida)
app.post('/api/datasets/upload', authMiddleware, upload.single('datasetFile'), async (req, res) => {
    try {
        const { titulo, descricao } = req.body;
        if (!req.file) {
            return res.status(400).json({ mensagem: 'Nenhum ficheiro enviado.' });
        }
        const { originalname, filename, path: filePath } = req.file;
        const usuarioId = req.usuario.id;
        if (!titulo || !descricao) {
            return res.status(400).json({ mensagem: 'Título e descrição são obrigatórios.' });
        }
        const [resultado] = await pool.query(
            `INSERT INTO datasets (titulo, descricao, nome_arquivo, caminho_arquivo, usuario_id)
             VALUES (?, ?, ?, ?, ?)`,
            [titulo, descricao, originalname, filePath, usuarioId]
        );
        res.status(201).json({ mensagem: 'Dataset carregado com sucesso!', datasetId: resultado.insertId });
    } catch (error) {
        console.error('Erro no upload:', error);
        res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
});

// ROTA: GET /api/datasets (Listar Todos)
app.get('/api/datasets', async (req, res) => {
    try {
        const [datasets] = await pool.query(
            `SELECT ds.*, u.nome as autor_nome 
             FROM datasets ds
             LEFT JOIN usuarios u ON ds.usuario_id = u.id
             ORDER BY ds.data_upload DESC`
        );
        res.status(200).json(datasets);
    } catch (error) {
        console.error('Erro ao listar datasets:', error);
        res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
});

// ROTA: GET /api/datasets/buscar
app.get('/api/datasets/buscar', async (req, res) => {
    try {
        const { termo } = req.query;
        if (!termo) {
            return res.status(400).json({ mensagem: 'Termo de pesquisa é obrigatório.' });
        }
        const termoBusca = `%${termo}%`;
        const [datasets] = await pool.query(
            `SELECT ds.*, u.nome as autor_nome 
             FROM datasets ds
             LEFT JOIN usuarios u ON ds.usuario_id = u.id
             WHERE ds.titulo LIKE ? OR ds.descricao LIKE ?
             ORDER BY ds.data_upload DESC`,
            [termoBusca, termoBusca]
        );
        res.status(200).json(datasets);
    } catch (error) {
        console.error('Erro ao buscar datasets:', error);
        res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
});

// ROTA: GET /api/datasets/:id (Ver Detalhes)
app.get('/api/datasets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [datasets] = await pool.query(
            `SELECT ds.*, u.nome as autor_nome 
             FROM datasets ds
             LEFT JOIN usuarios u ON ds.usuario_id = u.id
             WHERE ds.id = ?`,
            [id]
        );
        if (datasets.length === 0) {
            return res.status(404).json({ mensagem: 'Dataset não encontrado.' });
        }
        res.status(200).json(datasets[0]);
    } catch (error) {
        console.error('Erro ao buscar detalhe do dataset:', error);
        res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
});

// ROTA: GET /api/datasets/download/:id (Download - Protegida)
app.get('/api/datasets/download/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const [datasets] = await pool.query(
            `SELECT caminho_arquivo, nome_arquivo FROM datasets WHERE id = ?`,
            [id]
        );
        if (datasets.length === 0) {
            return res.status(404).json({ mensagem: 'Dataset não encontrado.' });
        }
        const dataset = datasets[0];
        const caminhoFisico = dataset.caminho_arquivo;
        const nomeOriginal = dataset.nome_arquivo;
        
        // A função mágica do Express para enviar ficheiros
        res.download(caminhoFisico, nomeOriginal, (err) => {
            if (err) {
                console.error('Erro no download:', err);
                res.status(404).json({ mensagem: 'Ficheiro não encontrado no servidor.' });
            }
        });
    } catch (error) {
        console.error('Erro ao processar download:', error);
        res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
});


/* --- ROTAS DE COMENTÁRIOS (Módulo 4) --- */

// ROTA: POST /api/datasets/:id/comentarios (Protegida)
app.post('/api/datasets/:id/comentarios', authMiddleware, async (req, res) => {
    try {
        const { id: datasetId } = req.params;
        const { texto } = req.body;
        const usuarioId = req.usuario.id;
        if (!texto || texto.trim() === '') {
            return res.status(400).json({ mensagem: 'O texto do comentário não pode estar vazio.' });
        }
        const [resultado] = await pool.query(
            `INSERT INTO comentarios (texto, usuario_id, dataset_id)
             VALUES (?, ?, ?)`,
            [texto, usuarioId, datasetId]
        );
        // Devolve o comentário completo para a UI
        const [novoComentario] = await pool.query(
            `SELECT c.*, u.nome as autor_nome
             FROM comentarios c
             LEFT JOIN usuarios u ON c.usuario_id = u.id
             WHERE c.id = ?`,
            [resultado.insertId]
        );
        res.status(201).json(novoComentario[0]);
    } catch (error) {
        console.error('Erro ao postar comentário:', error);
        res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
});

// ROTA: GET /api/datasets/:id/comentarios (Listar)
app.get('/api/datasets/:id/comentarios', async (req, res) => {
    try {
        const { id: datasetId } = req.params;
        const [comentarios] = await pool.query(
            `SELECT c.*, u.nome as autor_nome
             FROM comentarios c
             LEFT JOIN usuarios u ON c.usuario_id = u.id
             WHERE c.dataset_id = ?
             ORDER BY c.data_criacao ASC`,
            [datasetId]
        );
        res.status(200).json(comentarios);
    } catch (error) {
        console.error('Erro ao buscar comentários:', error);
        res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
});


// --- 7. INICIAR O SERVIDOR ---
app.listen(PORTA, () => {
    console.log(`Servidor "Scientia" a rodar na porta ${PORTA}`);
});