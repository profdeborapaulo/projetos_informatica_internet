const jwt = require("jsonwebtoken")

const autenticacaoMiddleweare = (req, res, next) => {
    // Pega só o token
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({error: "Erro no token"}).redirect('/');
    }

    try{
        const verificar = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verificar;
        next();
    }
    catch{
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
};

module.exports = autenticacaoMiddleweare