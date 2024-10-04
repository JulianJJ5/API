const Fichas = require('../Models/Fichas')
const variableVacia = ''

// CRUIA

const httpFichas = {
    getListarTodo: async (req, res) => {
        try {
            const fichas = await Fichas.find()
            res.json(fichas)
        } catch (error) {
            res.json({ message: error.message })
        }
    },

    getListarPorId: async (req, res) => {
        const _id = req.params.id
        try {
            const fichas = await Fichas.findById(_id);
            res.json(fichas)
        } catch (error) {
            res.json({ message: error.message })
        }
    },

    postCrearFicha: async (req, res) => {
        console.log("hola");
        
        const ficha = new Fichas({
            codigo: req.body.codigo.trim(),
            nombre: req.body.nombre.trim()
        });
        try {
            const nuevaFicha = await ficha.save();
            res.json(nuevaFicha)
        } catch (error) {
            res.json({ message: error.message })
        }
    },

    putActualizarFicha: async (req, res) => {
        const _id = req.params.id
        try {
            const fichaActualizada = await Fichas.findByIdAndUpdate(_id, req.body, { new: true });
            res.json(fichaActualizada)
        } catch (error) {
            res.json({ message: message.error })
        }
    },

    putDesactivarFichas: async (req, res) => {
        const id = req.params.id
        try {
            const ficha = await Fichas.findByIdAndUpdate(id, {estado: 0})
            res.json(ficha)
        } catch (error){
            res.json({ message: error.message})
        }
    },

    putActivarFichas: async (req, res) => {
        const _id = req.params.id
        try {
            const ficha = await Fichas.findByIdAndUpdate(_id, {estado: 1})
            res.json(ficha)
        } catch (error) {
            res.json({ message: error.message})
        }
    }
    

}

module.exports = { httpFichas }