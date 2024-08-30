const mongoose= require('mongoose');

const usuariosSchema = new mongoose.Schema({
    nombre:{type: String, required:true, max:50},
    email: {type: String, required:true, unique:true},
    contrasena: {type:String, required:true},
    estado:{type:Number, required:true, default:1}
})

module.exports = mongoose.model("Usuarios", usuariosSchema)