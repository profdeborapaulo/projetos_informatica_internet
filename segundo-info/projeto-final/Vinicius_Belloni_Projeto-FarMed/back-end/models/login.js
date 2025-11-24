import mongoose, { mongo } from "mongoose";


const loginSchema= new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId },
    nome: {type: String, required: true},
    senha:{type:String, required: true},
    remedios:{type: Array}
},  {versionKey:false})

const login = mongoose.model("login", loginSchema);

export default login;