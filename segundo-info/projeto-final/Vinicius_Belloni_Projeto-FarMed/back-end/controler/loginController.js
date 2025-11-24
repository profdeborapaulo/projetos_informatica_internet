import login from "../models/login.js";

class loginController {


    static async cadastrarLogins (req, res) {
        try {
            const novoLogin = await login.create(req.body);
            res.status(201).json({message: "criado com sucesso", logins: novoLogin});
        } catch (erro) {
            res.status(500).json({message:` ${erro.message} - falha ao cadastrar remedio`});
        }
    };

    static async listarLogins (req, res){
        try {
            const listaDelogins = await login.find({})
            res.status(200).json(listaDelogins);
        } catch (erro) {
            res.status(500).json({message:`${erro.message} falha ao pegar o medicamento`})
        }
    }

       static async listarLoginsPorId (req, res){
        try {
            const id = req.params.id
            const loginEncontrado = await login.findById(id)
            res.status(200).json(loginEncontrado);
        } catch (erro) {
            res.status(500).json({message:`${erro.message} falha ao pegar o medicamento`})
        }
    }

    static async LoginESenha(req,res){
        try {
            const logins = req.params.nome;
            const resposta = await login.findOne({nome:{$eq: logins}});
            res.status(200).json(resposta); 
        } catch (erro) {
            res.status(500).json({message:`${erro.message} falha ao pegar o login`})
        }
        
    }

    static async loginCorreto(req, res){

        try {
            const nomes = req.body.nome;
            const senhas = req.body.senha;
            const resposta = await login.findOne({nome:{$eq:nomes}, senha:{$eq:senhas}})
            res.status(200).json(resposta)    
        } catch (erro) {
                  res.status(500).json({message:`${erro.message} falha ao logar`})
        }
        
    }


    

    static async atualizarLogin (req,res){
    try {
        const id = req.params.id;
        let atualizado =  await login.findByIdAndUpdate(id, req.body,{new:true})
        res.status(200).json( atualizado);    
    } catch (erro) {
        res.status(500).json({message:`${erro.message} falha na atualização do login`});  
    }
    
    }

    static async atualizarRemedios (req,res){
        try {
            const id = req.params.id;
            let atualizado =  await login.findById(id);
            atualizado.remedios.push(req.body);
            await login.updateOne({_id: id}, atualizado);
            res.status(200).json(atualizado);    
        } catch (erro) {
            res.status(500).json({message:`${erro.message} falha na atualização do login`});  
        }
}
       static async deletarLogin (req,res){
            try {
                const id = req.params.id;
                let deletado =  await login.findByIdAndDelete(id, req.body,{new:true})
                res.status(200).json( deletado);    
            } catch (erro) {
                res.status(500).json({message:`${erro.message} falha em deletar o login`})  ;  
            }
            
        };

 
}

export default loginController;