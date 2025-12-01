const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

// Busca as Listas de um grupo especifico
exports.getContas = async (grupo_id) => {
    const resultado = await sql.query("SELECT * FROM conta where grupo_id = $1", [grupo_id])

    if(resultado && resultado[0] != null){
        return resultado
    }
    else{
        return null
    }
}

exports.criarConta = async (grupo_id, nome, descricao, valor_total, data_vencimento, data_pagamento, paga, categoria_conta) => {
    const resultado = await sql.query("insert into conta(grupo_id, nome, descricao, valor_total, data_vencimento, data_pagamento, paga, categoria_conta) values($1, $2, $3, $4, $5, $6, $7, $8) RETURNING conta_id", [grupo_id, nome, descricao, valor_total, data_vencimento, data_pagamento, paga, categoria_conta])

    if(resultado && resultado.length > 0){
        return resultado;
    }
    else{
        return null
    }
}
