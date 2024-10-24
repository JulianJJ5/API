const Bitacora = require('../Models/Bitacora.js');

const bitacoraHelper = {
    yaExisteBitacoraHoy: async (fecha, id_aprendiz) => {
        // Buscar bitácoras del aprendiz por su ID
        const bitacorasAprendiz = await Bitacora.find({ id_aprendiz });
        
        // Formatear la fecha actual para comparación (sin horas)
        const fechaSinHora = new Date(fecha).setHours(0, 0, 0, 0);

        // Comprobar si ya tiene una bitácora registrada en la misma fecha
        const yaRegistrado = bitacorasAprendiz.some(bitacora => {
            const fechaBitacora = new Date(bitacora.fecha).setHours(0, 0, 0, 0);
            return fechaBitacora === fechaSinHora;
        });

        // Si ya tiene una bitácora, lanzar un error
        if (yaRegistrado) {
            throw new Error(`El aprendiz ya fue registrado en la fecha ${new Date(fecha).toLocaleDateString()}`);
        }
    }
};

module.exports = { bitacoraHelper };
