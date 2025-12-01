const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

exports.getItemsLista = async (lista_id) => {
    const resultado = await sql.query("SELECT item_lista.*, lista.nome_lista FROM item_lista left join lista on item_lista.lista_id = lista.lista_id where item_lista.lista_id = $1", [lista_id]);

    if(resultado && resultado.length > 0){
        return resultado
    }
    
    return null
}

// Busca as Listas de um grupo especifico
exports.getListas = async (grupo_id) => {
    const resultado = await sql.query("SELECT lista.*, count(IL.item_lista_id) as quantidade FROM lista LEFT JOIN item_lista IL on lista.lista_id = IL.lista_id where lista.grupo_id = $1 group by lista.lista_id", [grupo_id])

    if(resultado && resultado[0] != null){
        return resultado
    }
    else{
        return null
    }
}

exports.criarLista = async ( grupo_id, nome_lista) => {
    const resultado = await sql.query("INSERT INTO lista(grupo_id, nome_lista, ativa) values($1, $2, $3) RETURNING grupo_id", [grupo_id, nome_lista, 1])

    try{
        if(resultado.length > 0){
                return resultado
        }
        else{
            return JSON.stringify({message: "Erro ao incluir usuarioCriador"}) 
        }
    }
    catch{
        return null
    }
    
}

exports.cadastraItem = async (lista_id, nome_item, quantidade, categoria_item, comprado, valor_item) => {
    try{
        const resultado = await sql.query("insert into item_lista(lista_id, nome_item, quantidade, categoria_item, comprado, valor_item) values($1, $2, $3, $4, $5, $6) RETURNING item_lista_id",  [lista_id, nome_item, quantidade, categoria_item, comprado, valor_item])

        if(resultado && resultado.length > 0){
            return resultado
        }
        
        return null
    }
    catch(error){
        return null
    }
}

exports.atualizarItemComprado = async (item_lista_id, comprado) => {
    try{
        const resultado = await sql.query("UPDATE item_lista SET comprado = $1 WHERE item_lista_id = $2 RETURNING item_lista_id, comprado", [comprado ? 1 : 0, item_lista_id]); // Ternariozinho paracolocar 1 ou 0 no db ; )

        if (resultado && resultado.length > 0) 
            return resultado;

        return null;
    }
    catch(error){
        return null;
    }
}

exports.deleteItens = async (itemIds) => {
    if (!Array.isArray(itemIds) || itemIds.length === 0) {
        return false;
    }

    try {
        const placeholders = itemIds.map((_, i) => `$${i + 1}`).join(',');
        const query = `DELETE FROM item_lista WHERE item_lista_id IN (${placeholders}) RETURNING item_lista_id`;
        const resultado = await sql.query(query, itemIds);

        const deletedCount = Array.isArray(resultado) ? resultado.length : (resultado && typeof resultado.rowCount === 'number' ? resultado.rowCount : 0);

        return deletedCount > 0;
    } catch (error) {
        console.error('Erro ao deletar itens no modelo:', error);
        return false;
    }
};