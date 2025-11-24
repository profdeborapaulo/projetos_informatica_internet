import remedio from "../models/remedio.js";

class remedioController {
    static async listarRemedios (req,res){
        try {
            const listaRemedios = await remedio.find({})
            res.status(200).json(listaRemedios);    
        } catch (erro) {
            res.status(500).json({message:`${erro.message} falha na requisição`})    
        }
        
    };

    static async listarRemediosPorId (req,res){
        try {
            const id = req.body.id
            const remediosEcontrado = await remedio.findById(id)
            res.status(200).json(remediosEcontrado);    
        } catch (erro) {
            res.status(500).json({message:`${erro.message} falha na requisição do remedio`});    
        }
        
    };

    static async cadastrarRemedio (req, res) {
        try {
            const novoRemedio = await remedio.create(req.body);
            res.status(201).json({message: "criado com sucesso", remedio: novoRemedio});
        } catch (erro) {
            res.status(500).json({message:` ${erro.message} - falha ao cadastrar remedio`});
        }
    }


    
    static async atualizarRemedios (req,res){
        try {
            const id = req.params.id;
            let atualizado =  await remedio.findByIdAndUpdate(id, req.body,{new:true})
            res.status(200).json( atualizado);    
        } catch (erro) {
            res.status(500).json({message:`${erro.message} falha na atualização do remedio`})  ;  
        }
        
    };

    static async buscarRemedio (req, res){
        const nome = req.query.nome;
        console.log(nome)
        try {
            const remediosPorNome = await remedio.find({nome: nome});
            res.status(200).json(remediosPorNome);
        } catch (erro) {
            res.status(500).json({message:`${erro.message} falha na busca do remedio`});
        }
    }
}

export default remedioController;