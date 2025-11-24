import mongoose, { mongo } from "mongoose";
import { medicamentoSchema } from "./medicamentos.js";

const categoriaSchema= new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId },
    nome: {type: String},
    descricao:{type:String},
    info: {type: String},
    icon:{type: String}

},  {versionKey:false})

const categoria = mongoose.model("categorias", categoriaSchema);

export default categoria;