import mongoose, { mongo } from "mongoose";

const remedioSchema= new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId },
    nome: {type: String},
    categoria:{type:String},
    descricao: {type: String},
    composicao: {type: String},
    comoTomar: {type: String},
    frequencia:{ type: String},
    doseMaxima:{ type: String},
    efeitos: {type:Array},
    avisos: {type: Array},
    armazenamento: {type: String}
},  {versionKey:false})

const remedio = mongoose.model("remedios", remedioSchema);

export default remedio;