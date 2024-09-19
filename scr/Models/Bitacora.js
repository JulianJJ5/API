const mongoose = require('mongoose');
const { type } = require('os');

const bitacoraSchema = new mongoose.Schema({
    id_aprendiz: {type: mongoose.Schema.Types.ObjectId, ref: 'Aprendices'},
    estado: {type: String, default: "Pendiente", enum: ["Asistió", "No asistió", "Excusa", "Pendiente"]},
    fecha: {type:Date, required:true},
})

module.exports= mongoose.model("Bitacoras", bitacoraSchema)