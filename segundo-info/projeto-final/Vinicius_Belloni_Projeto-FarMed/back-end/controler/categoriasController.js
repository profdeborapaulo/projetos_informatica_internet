import categoria from "../models/categorias.js";
import { medicamento } from "../models/medicamentos.js";

class categoriaController {
    static async listarcategoria (req,res){
        try {
            const listarcategoria = await categoria.find({})
            res.status(200).json(listarcategoria);    
        } catch (erro) {
            res.status(500).json({message:`${erro.message} falha na requisição`})    
        }
        
    };


    static async cadastrarCategoria (req, res) {
        try {
            const novoCategoria = await categoria.create(req.body);
            res.status(201).json({message: "criado com sucesso", categoria: novoCategoria});
        } catch (erro) {
            res.status(500).json({message:` ${erro.message} - falha ao cadastrar categoria`});
        }
    };


    static async categoriaPorNome (req,res){
        try {
            const nomeCategoria =  req.params.nome;
            let encontrarCategoria = await categoria.findOne({nome:{$eq: nomeCategoria}});
            res.status(200).json(encontrarCategoria);
        } catch (erro) {
            res.status(500).json({message:` ${erro.message} - falha ao buscar categoria por nome`});
        }
    }


    static async medicamentosDeMesmaCategoria (req,res){
        try {
            const nomeCategoria =  req.params.nome;
            // const categoriaMedicamentos = req.params.categoria;
            let encontrarMedicamentos = await medicamento.find({categoria:{$eq: nomeCategoria}});
            let encontrarCategoria = await categoria.findOne({nome:{$eq: nomeCategoria}});

            let retorno = {
                categoria: encontrarCategoria,
                medicamentos: encontrarMedicamentos
            }

            res.status(200).json(retorno)

        } catch (erro) {
            res.status(500).json({message:` ${erro.message} - falha ao buscar categoria e medicamentos por nome e categoria`});
        }
    }


        static async atualizarCategorias (req,res){
            try {
                const id = req.params.id;
                let atualizado =  await categoria.findByIdAndUpdate(id, req.body,{new:true})
                res.status(200).json( atualizado);    
            } catch (erro) {
                res.status(500).json({message:`${erro.message} falha na atualização da categoria`})  ;  
            }
            
        };
        



}

export default categoriaController;