const mongoose = require('mongoose');
const { type } = require('os');

const aprendizSchema = new mongoose.Schema({
    documento: {type: String, require: true, unique: true, max: 10},
    nombre: {type: String, require: true, max: 50},
    estado: {type: Number, require: true, default: 1},
    telefono: {type: String, require: true},
    email: {type: String, require: true},
    id_ficha: { type: mongoose.Schema.Types.ObjectId, ref: 'Fichas'} 
}, {timestamps: true})


module.exports = mongoose.model("Aprendices", aprendizSchema)