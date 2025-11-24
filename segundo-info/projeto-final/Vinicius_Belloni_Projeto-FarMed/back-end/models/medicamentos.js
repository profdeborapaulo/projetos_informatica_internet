import mongoose, { mongo } from "mongoose";

const medicamentoSchema= new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId },
    nome: {type: String},
    categoria:{type:String},
    descricao: {type: String},
},  {versionKey:false})

const medicamento = mongoose.model("medicamentos", medicamentoSchema);

export  {medicamento, medicamentoSchema};