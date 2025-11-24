const jwt = require('jsonwebtoken');
require('dotenv').config();

function authMiddleware(req, res, next) {
    // 1. Obter o token do cabeçalho do pedido
    // O formato padrão é "Bearer TOKEN_LONGO_AQUI"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ mensagem: 'Acesso negado. Nenhum token fornecido.' });
    }

    // 2. Extrair apenas o token
    const token = authHeader.split(' ')[1];

    try {
        // 3. Verificar se o token é válido (usando o nosso segredo)
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Se for válido, anexamos os dados do utilizador ao 'req'
        // para que o próximo endpoint (o de upload) saiba quem é o utilizador.
        req.usuario = payload; // ex: req.usuario.id, req.usuario.nome
        next(); // Passa para o próximo passo (o upload)

    } catch (error) {
        res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
    }
}

module.exports = authMiddleware;