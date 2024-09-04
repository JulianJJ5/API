const Aprendices = require('../Models/Aprendices.js')
const Fichas = require('./../Models/Fichas.js')
const mongoose = require('mongoose');


const aprendicesHelper = {
    existeAprendizID: async (documento) => {
        const existe = await Aprendices.findOne({ documento });
        if (!existe) {
            throw new Error(`El aprendiz con el documento ${documento} ya existe`, existe);
        }
    },

    existeCodigoFicha: async (id_ficha) => {
        if (!mongoose.Types.ObjectId.isValid(id_ficha)) {
            throw new Error(`El id_ficha ${id_ficha} no es un ObjectId válido`);
        }        

        const existe = await Fichas.findById(id_ficha);
        console.log(existe);
        if (!existe) {
            throw new Error(`La ficha con el id ${id_ficha} no existe`);
        }
    }
}

module.exports = { aprendicesHelper }