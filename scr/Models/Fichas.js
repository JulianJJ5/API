const mongoose = require('mongoose');
const { type } = require('os');

const fichaSchema = new mongoose.Schema({
    codigo: {type: String, required: true},
    nombre: {type: String, require: true},
    estado: {type: Number, require: true, default: 1}, 
}, {timestamps: true})


module.exports= mongoose.model("Fichas", fichaSchema)