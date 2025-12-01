const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);
const Utils = require('../Utils/suporte');

exports.carregarGrupo = async (grupo_id) => {
    const resultado = await sql.query('SELECT * from grupo where grupo_id = $1', [grupo_id])

    if(!resultado)
        return null

    return resultado;
}

exports.BuscarGruposPorUsuarioId = async (usuario_id) => {
    const resultado = await sql.query('SELECT grupo.grupo_id , grupo.nome_grupo from grupo_membro inner join grupo on grupo.grupo_id = grupo_membro.grupo_id where usuario_id = $1', [usuario_id])

    if(resultado == null)
        return null

    return resultado;
}

exports.EntrarEmGrupoPorCodigo = async (usuario_id, grupoCodigo) => {
    try
    {

        const buscarGrupo = await sql.query("select grupo_id from grupo where shareCode = $1", [grupoCodigo])
        
        if (buscarGrupo.length > 0) {
            const grupo_id = buscarGrupo[0].grupo_id;
            const inserir = await sql.query("insert into grupo_membro(grupo_id, usuario_id) values ($1, $2) RETURNING usuario_id", [grupo_id, usuario_id])
            
            if(!inserir)
                return null;
            
            return inserir;
        }
        
        return null;
        
    }
    catch(error){
        return JSON.stringify({code: error.code, message: error.message})
    }
}

exports.criarGrupo = async (usuario_id, nome_grupo, tipo_grupo) => {
    
    const maxTentativas = 5
    let tentativanumero = 0
    
    do{
        tentativanumero++
        const shareCode = Utils.gerarCodigoDe6DigitosAleatorio();
        try{
            
            const criarGrupo = await sql.query("insert into grupo(nome_grupo, tipo_grupo, sharecode, usuarioCriador) values ($1, $2, $3, $4) RETURNING grupo_id", [nome_grupo, tipo_grupo, shareCode, usuario_id])
            
            if(criarGrupo.length > 0){
                const grupoCodigo = criarGrupo[0].grupo_id;
                const loginUsuarioCriador = await sql.query("insert into grupo_membro(grupo_id, usuario_id) values($1, $2) RETURNING data_entrada", [grupoCodigo, usuario_id]) 
                
                if(loginUsuarioCriador.length > 0){
                    return criarGrupo
                }
                else{
                    return JSON.stringify({message: "Erro ao incluir usuarioCriador"}) 
                }
            }
            
            return null;
        }
        catch(error){
            if (error.code === '23505') {
                if (tentativanumero < maxTentativas) {
                    continue; 
                } else {
                    return JSON.stringify({ message: "Não foi possível gerar um código de compartilhamento." });
                }
            }
            else{
                return JSON.stringify({message: error.message})
            }
        }
    } while (tentativanumero < maxTentativas)
}