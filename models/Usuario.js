const mongoose=require("mongoose")

const usuarioSchema= new mongoose.Schema({
    cuenta:String ,
    password: String,
    nombre: String,
    apellido: String,
    imagen: String,
    googleUser: Boolean,    
    rol: {type: String , default: "registrado"},
    paquetesFaveados:[{type: mongoose.Schema.ObjectId , ref: "paquete",default: []}],
    paquetesComprados:[{
        idPaquete:{type: mongoose.Schema.ObjectId , ref: "paquete"},
        cantidad: Number
    }]
})

const Usuario=mongoose.model("usuario",usuarioSchema);

module.exports=Usuario;