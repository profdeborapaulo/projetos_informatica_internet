const model = require('../models/usuarioModel');

exports.getDadosUsuario = async (req, res) => {
    const usuario_id = req.params.usuario_id;

    try{
        const resultado = await model.BuscarUsuarioPorId(usuario_id);

        if(resultado){
            res.status(200).json({resultado, message: "Sucesso"});
        }
        else{
            res.status(401).json({message: "Usuario não encontrado"});
        }
    }
    catch(error){
        res.status(500).json({message: "Erro interno do Servidor", error: error})
    }
}

exports.alterarSenhaUsuario = async (req,res) => {
    const {usuario_id, senhaAntiga, senhaNova} = req.body

    try{
        const resultado = await model.alterarSenha(usuario_id, senhaAntiga, senhaNova);

        if(resultado){
            res.status(200).json({resultado, message: "Sucesso"});
        }
        else{
            res.status(401).json({message: "Erro ao Alterar Senha"});
        }
    }
    catch(error){
        res.status(500).json({message: "Erro interno do Servidor", error: error})
    }
}