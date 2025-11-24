import categoria from "../models/categorias.js";
import {medicamento} from "../models/medicamentos.js";

class medicamentoController {


    static async cadastrarMedicamentos (req, res) {
        try {
            const novoMedicamento = await medicamento.create(req.body);
            res.status(201).json({message: "criado com sucesso", medicamentos: novoMedicamento});
        } catch (erro) {
            res.status(500).json({message:` ${erro.message} - falha ao cadastrar remedio`});
        }
    };

    static async listarMedicamentos (req, res){
        try {
            const listaDeMedicamentos = await medicamento.find({})
            res.status(200).json(listaDeMedicamentos);
        } catch (erro) {
            res.status(500).json({message:`${erro.message} falha ao pegar o medicamento`})
        }
    }

    static async medicamentoECategoria (req, res){
        try {
            const categoriaModel = await categoria.find({ id: req.query.id})
            const listaDeMedicamentos = await medicamento.find({ categoria: categoriaModel.Nome})
            const resultado = {
                categoria,
                medicamentos: listaDeMedicamentos
            }
            res.status(200).json(resultado);
        } catch (erro) {
            res.status(500).json({message:`${erro.message} falha ao pegar o medicamento`})
        }
    }


      static async deletarMedicamento (req,res){
            try {
                const id = req.params.id;
                let deletado =  await medicamento.findByIdAndDelete(id, req.body,{new:true})
                res.status(200).json( deletado);    
            } catch (erro) {
                res.status(500).json({message:`${erro.message} falha em deletar o medicamento`})  ;  
            }
            
        };
}

export default medicamentoController;