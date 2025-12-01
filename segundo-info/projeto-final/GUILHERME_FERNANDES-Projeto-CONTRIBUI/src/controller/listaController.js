const model = require('../models/listaModel');

exports.criarLista = async (req, res) => {
    const { grupo_id, nome_lista} = req.body;

    if(!grupo_id || !nome_lista || nome_lista == '')
        res.status(400).json({message: 'Campos Obrigatorios'});

    const resultado = await model.criarLista(grupo_id, nome_lista);

    if(resultado && resultado != null){
        res.status(200).json(resultado);
    }
    else{
        res.status(500).json({message: "Erro interno"})
    }    
}

exports.getItems = async (req, res) => {
    const lista_id = req.params.lista_id

    try{

        if(!lista_id || lista_id.trim() == "")
            res.status(400).json({message: 'Id Obrigatorio'});
        
        const resultado = await model.getItemsLista(lista_id)
        
        if(resultado){
            res.status(200).json({resultado: resultado})
        }
        else{
            res.status(400).json({message: 'Itens não encontrados'})
        }
    }
    catch{
        res.status(500).json({message: 'Erro interno do servidor'})
    }
}

exports.cadastraItem = async (req, res) => {
    const {lista_id, nome_item, quantidade, categoria_item, comprado, valor_item} = req.body

    try{
        const resultado = await model.cadastraItem(lista_id, nome_item, quantidade, categoria_item, comprado, valor_item);
    
        if(resultado){
            res.status(200).json({message: 'Cadastrado!' ,resultado: resultado});
        }
        else{
            res.status(400).json({message: 'Erro ao cadastrar!'});
        }
    }
    catch{
        res.status(400).json({message: 'Erro ao cadastrar'})
    }
}

exports.atualizarItem = async (req, res) => {
    const { item_id } = req.params;
    const { comprado } = req.body;

    if (!item_id) 
        return res.status(400).json({ message: 'item_id obrigatório' });

    try {
        const resultado = await model.atualizarItemComprado(item_id, Boolean(comprado));
        
        if (!resultado) 
            return res.status(500).json({ message: 'Erro ao atualizar item' });

        return res.status(200).json({ message: 'Item atualizado', comprado: Boolean(comprado) });
    } 
    catch (error) {
        return res.status(500).json({ message: error.message || 'Erro interno' });
    }
};

exports.deleteItens = async (req, res) => {
    const { itemIds } = req.body;

    if (!itemIds || !Array.isArray(itemIds) || itemIds.length === 0) {
        return res.status(400).json({ message: 'É necessário um array de IDs de itens.' });
    }

    try {
        const resultado = await model.deleteItens(itemIds);
        
        if (resultado) {
            return res.status(200).json({ message: 'Itens excluídos com sucesso.' });
        } else {
            return res.status(500).json({ message: 'Erro ao excluir itens.' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Erro interno do servidor.' });
    }
};