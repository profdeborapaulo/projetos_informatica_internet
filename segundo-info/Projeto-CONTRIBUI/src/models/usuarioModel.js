const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Busca um usuário por email. 
exports.BuscarUsuarioPorEmail = async (email) => {
    // Não usei `` com injeção $() pq pode ter sql injection
    const resultado = await sql.query('SELECT * FROM usuario WHERE email = $1', [email]);
    return resultado && resultado.rows ? resultado.rows[0] : undefined;
};

// Busca um usuário por id. 
exports.BuscarUsuarioPorId = async (usuario_id) => {
    // Não usei `` com injeção $() pq pode ter sql injection
    const resultado = await sql.query('SELECT * FROM usuario WHERE usuario_id = $1', [usuario_id]);
    return resultado && resultado[0] ? resultado[0] : undefined;
};

exports.logar = async (email, senha) => {
    // LIMIT 1 para trazer apenas um registro
    const resultado = await sql.query('SELECT * FROM usuario WHERE email = $1 LIMIT 1', [email]);
    
    if (resultado.length === 0) {
        // Se não encontrou usuário com o e-mail
        return null;
    }

    try {
        const usuario = resultado[0];
        
        // Valida a senha
        const valida = await bcrypt.compare(senha, usuario.senha_hash);

        if (!valida) return null;

        const token = jwt.sign(
            { id: usuario.usuario_id, email: usuario.email }, //Payload
            process.env.JWT_SECRET,  // Chave JWT Secreta
            { expiresIn: '1h' } // Tempo de Expiração
        );

        return { usuario_id: usuario.usuario_id ,nome: usuario.nome , token: token };
    } catch (error) {
        console.error("Erro durante a comparação do hash:", error);
        return null;
    }
};

exports.cadastrar = async (nome, email, senha) => {
    const senha_hash = await bcrypt.hash(senha, 10)
    const resultado = await sql.query('insert into usuario(nome, email, senha_hash) values ($1, $2, $3) RETURNING usuario_id', [nome, email, senha_hash])
    
    if(resultado != null){
        return resultado
    }
    
    return null;    
}

exports.alterarSenha = async (usuario_id,senhaAntiga, senhaNova) => {
    const resultado = await sql.query('SELECT * FROM usuario WHERE usuario_id = $1 LIMIT 1', [usuario_id]);
    
    if (resultado.length === 0) {
        // Se não encontrou usuário com o e-mail
        return null;
    }

    try {
        const usuario = resultado[0];
        
        // Valida a senha
        const valida = await bcrypt.compare(senhaAntiga, usuario.senha_hash);

        if(valida)
        {
            const novaSenha_hash = await bcrypt.hash(senhaNova, 10)
            const resultado = await sql.query('Update usuario set senha_hash = $1 where usuario_id = $2 RETURNING usuario_id', [novaSenha_hash, usuario_id])
            
            return resultado;
        }
        else{
            return null;
        }
    }
    catch(error){
        return null;
    }
}