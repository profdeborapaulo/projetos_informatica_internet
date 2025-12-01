const model = require('../models/usuarioModel');

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'E-mail e senha são obrigatórios' });
    }

    try {
        // Chama o metôdo de login no model
        const usuario = await model.logar(email, senha);

        // Verifica se foi bem sucedido
        if (usuario) {
            res.cookie('token', usuario.token, {
                httpOnly: true, // Impedindo que o cookie possa ser lido via .js
                maxAge: 3600000, // 1 hora de validade
                sameSite: 'Lax' // Segundo minha pesquisa permite apenas que o cookie do token seja usado no meu site ou em sites de um 'nivel superior'
            });

            return res.status(200).json({ success: true, message: 'Autenticado', usuario_id: usuario.usuario_id, nome: usuario.nome });
            
        } else {
            return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};


exports.cadastrar = async (req, res) => {
    const { nome, email, senha} = req.body;
    try{
        const cadastro = await model.cadastrar(nome, email, senha)

        if(cadastro != null){
            return res.status(200).json({success: true, message: 'Cadastrado com Sucesso', cadastro})
        }
        else{
            return res.status(400).json({success: false, message: 'Erro ao Cadastrar', cadastro})
        }
    }
    catch (error) {
        console.error('Erro ao cadastrar:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};