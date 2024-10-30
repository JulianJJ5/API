const Bitacoras = require('../Models/Bitacora.js');
const Aprendices = require('..//Models/Aprendices.js');
const { ObjectId } = require('mongoose').Types;
const variableVacia = ''

const httpBitacora = {
        getListarTodo: async (req, res) => {
            try {
                const bitacoras = await Bitacoras.find();
                res.json({ bitacoras });
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },

        getListarPorFecha: async (req, res) => {
            try {
                const { fecha } = req.params;
        
                const startOfDay = new Date(fecha);
                startOfDay.setUTCHours(0, 0, 0, 0); // Inicio del día a las 00:00:00
        
                const endOfDay = new Date(fecha);
                endOfDay.setUTCHours(23, 59, 59, 999); // Fin del día a las 23:59:59
        
                const bitacoras = await Bitacoras.find({
                    fecha: {
                        $gte: startOfDay,
                        $lte: endOfDay
                    }
                });
        
                res.json({ bitacoras });
            } catch (error) {
                res.status(400).json({ error });
            }
        },

        getListarPorFicha: async (req, res) => {
            const { id_ficha } = req.params; // Asegúrate de que se extraiga correctamente
            try {
                // Primero, obtenemos todos los aprendices que están en la ficha proporcionada
                const aprendicesEnFicha = await Aprendices.find({ id_ficha }) // Asegúrate de que el campo sea id_ficha
                    .exec();
        
                console.log('id_ficha:', id_ficha);
                
                // Verifica si se encontraron aprendices
                if (!aprendicesEnFicha.length) {
                    return res.status(404).json({ message: 'No se encontraron aprendices en esta ficha.' });
                }
        
                // Luego, buscamos las bitácoras que tienen los id_aprendiz que hemos encontrado
                const bitacoras = await Bitacoras.find({ id_aprendiz: { $in: aprendicesEnFicha.map(aprendiz => aprendiz._id) } })
                    .populate('id_aprendiz') // Poblar otros campos si es necesario
                    .exec();
        
                // Envía ambas listas como respuesta
                res.json({ aprendices: aprendicesEnFicha, bitacoras });
            } catch (error) {
                console.error("Error al obtener las bitácoras:", error);
                res.status(500).json({ message: 'Error al obtener las bitácoras', error });
            }
        },
        

    getListarBitacorasPorEstado: async (req, res) => {
        try {
            const bitacora = await Bitacoras.find({ estado: "Asistió" });
            res.json({ bitacora });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    getListarPorAprendiz: async (req, res) => {
        const { id_aprendiz } = req.params;
        try {
            const bitacoras = await Bitacoras.find({
                id_aprendiz: id_aprendiz,
            });
            res.json({ bitacoras });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    postCrearBitacora: async (req, res) => {
        try {
            const { id_aprendiz, fecha } = req.body;
                if (!id_aprendiz || !fecha) {
                return res.status(400).json({ message: 'Los campos id_aprendiz y fecha son obligatorios.' });
            }
            const nuevaBitacora = new Bitacoras({
                id_aprendiz,
                fecha
            });
            const bitacoraGuardada = await nuevaBitacora.save();
            res.status(201).json(bitacoraGuardada);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    putActualizarEstadoBitacora: async (req, res) => {
        const { id } = req.params;
        const { estado } = req.body;
        try {
            const bitacoraActualizada = await Bitacoras.findByIdAndUpdate(
                id,
                { estado},
                { new: true }
            );
            if (!bitacoraActualizada) {
                return res.status(404).json({ message: 'Bitácora no encontrada' });
            }
            res.json(bitacoraActualizada);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = { httpBitacora };
