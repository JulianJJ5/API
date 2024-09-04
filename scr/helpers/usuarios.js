const Usuario = require('../Models/Usuarios.js')

const UserHelper = {

    existeUsuarioID: async (id, req) => {
        const existe = await Usuario.findById(id)
        if (!existe) {
            throw new Error( `Registro no existe ${id}`)
        }

        req.req.usuariobd = existe

    },

    existeEmail: async (email, req) => {
        const existe = await Usuario.findOne({ email: email })
        if (existe) {
            throw new Error( `Registro email ya existe ${email}`)
        }

        req.req.usuariobd = existe

    },
    
    state: async (res, rew) => {
        const existe = await User.findOne({ estado })
        if (estado != 1 || estado != 0) {
            throw new Error('el estado debe ser 1 o 0')
        }
    }
}


module.exports = { UserHelper }