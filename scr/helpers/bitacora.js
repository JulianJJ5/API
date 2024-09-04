const bitacora = require('../Models/Bitacora.js')
const Fichas = require('./../Models/Fichas')

const bitacoraHelper = {
    existeCodigoFicha: async (id_ficha, req) => {
        const existe = await Fichas.findOne({ id_ficha });
        if (!existe) {
            throw new Error(`La ficha con el id ${id_ficha} no existe`);
            }
    }
}

module.exports={bitacoraHelper}