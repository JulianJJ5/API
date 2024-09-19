const Bitacoras = require('../Models/Bitacora.js');
const Aprendices = require('../Models/Aprendices.js');

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
        const { fecha } = req.body;
        try {
            const bitacora = await Bitacoras.find({ fecha });
            res.json(bitacora);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getListarPorFicha: async (req, res) => {
        const { id_ficha } = req.params;
        try {
            const aprendices = await Aprendices.find({ id_ficha });

            // Extraer los IDs de los aprendices de la ficha
            const ids_Aprendiz = aprendices.map((aprendiz) => aprendiz._id);
            const bitacoras = await Bitacoras.find({
                id_aprendiz: { $in: ids_Aprendiz },
            });
            res.json(bitacoras);
        } catch (error) {
            res.status(400).json({ message: error.message });
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
