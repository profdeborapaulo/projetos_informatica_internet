const model = require('../models/contasModel');

exports.criarConta = async (req, res) => {
    const { grupo_id, nome, descricao, valor_total, data_vencimento, data_pagamento, paga, categoria_conta} = req.body;

    if(!grupo_id || !nome || !descricao || !valor_total || !data_vencimento || !data_pagamento || !categoria_conta || nome === '' || descricao === ''){
        res.status(400).json({message: 'Campos Obrigatorios'});
    }
    else{
        const resultado = await model.criarConta(grupo_id, nome, descricao, valor_total, data_vencimento, data_pagamento, paga, categoria_conta);
        
        if(resultado && resultado != null){
            res.status(200).json(resultado);
        }
        else{
            res.status(500).json({message: "Erro interno"})
        }
    }
}