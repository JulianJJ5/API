const Fichas = require('../Models/Fichas.js')

const FichasHelper = {
    existeFichaId: async (res, req) => {
        const _id = req.params.id
        try {
            const existe = await Fichas.findOne({ _id })
            res.json({ existe })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },
    state: async (res, rew) => {
        const existe = await Fichas.findOne({ estado })
        if (estado != 1 || estado != 0) {
            throw new Error('el estado debe ser 1 o 0')
        }
    }
}


module.exports = { FichasHelper }