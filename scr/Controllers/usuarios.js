const Usuarios = require('../Models/Usuarios.js')
const bcryptjs = require("bcryptjs")
const {generarJWT} = require ("../middlewares/validarJWT")
const variableVacia = ''

//CRUDAI
const httpUsuarios = {
    getListarTodo: async (req, res) => {
        try {
            const usuarios = await Usuarios.find();
            res.json(usuarios)
        } catch (error) {
            res.json({ message: error.message })        }
    },

    postCrearUsuario: async (req, res) => {
        try{
            console.log('datos req.body', req.body);
            const { nombre, email, contrasena } = req.body;
            const usuario = new Usuarios({ email, contrasena, nombre });
            const salt = bcryptjs.genSaltSync(10);
            usuario.contrasena = bcryptjs.hashSync(contrasena, salt);
            await usuario.save()
            res.json(usuario)

        } catch (error) {
            res.json({ message: error.message })
        }
    },

    postLoginUsuario: async (req, res) => {
        const { email, contrasena } = req.body;
    
        try {
            const usuario = await Usuarios.findOne({ email });
    
            // Verificar si el usuario existe
            if (!usuario) {
                return res.status(401).json({
                    msg: "Usuario / Password no son correctos1"
                });
            }
    
            // Verificar si el usuario está activo
            if (usuario.estado === 0) {
                return res.status(401).json({
                    msg: "Usuario inactivo"
                });
            }
    
            // Comparar la contraseña ingresada con la contraseña almacenada
            const validPassword = bcryptjs.compareSync(contrasena, usuario.contrasena); // Comparar con usuario.contrasena
            if (!validPassword) {
                return res.status(401).json({
                    msg: "la contraseña es incorrecta"
                });
            }
    
            // Generar el token
            const token = await generarJWT(usuario._id);
    
            // Responder con el usuario y el token
            res.json({
                usuario: usuario,
                token
            });
        } catch (error) {
            // Devolver un error 500 en caso de excepción
            return res.status(500).json({
                message: error.message
            });
        }
    },

    putCambiarContrasena: async (req, res) => {
        const { _id } = req.params;
        const { contrasenaActual, nuevaContrasena } = req.body;

        try {
            const usuario = await Usuarios.findById(_id);

            if (!usuario) {
                return res.status(404).json({
                    msg: "Usuario no encontrado"
                });
            }

            // Comparar la contraseña actual ingresada con la contraseña almacenada
            const validPassword = bcryptjs.compareSync(contrasenaActual, usuario.contrasena);
            if (!validPassword) {
                return res.status(401).json({
                    msg: "La contraseña actual es incorrecta"
                });
            }

            // Cifrar la nueva contraseña
            const salt = bcryptjs.genSaltSync(10);
            const contrasenaCifrada = bcryptjs.hashSync(nuevaContrasena, salt);

            // Actualizar la contraseña en la base de datos
            usuario.contrasena = contrasenaCifrada;
            await usuario.save();

            res.json({
                msg: "Contraseña cambiada exitosamente"
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },

    putActualizarUsuario: async (req, res) => {
        const { id } = req.params
                try{
            const usuarioActualizado = await Usuarios.findByIdAndUpdate(id, req.body, { new: true });
            if (!usuarioActualizado) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.json({ usuarioActualizado });
        } catch (error) {
            res.json({ message: error.message})
        }
    },

    putDesactivarUsuario: async (req, res) => {
        const { id } = req.params
        try{
            const usuarioDesactivado = await Usuarios.findByIdAndUpdate(id, {estado: 0});
            res.json(usuarioDesactivado)
        } catch (error) {
            res.json({ message: error.message })
        }
    },

    putActivarUsuario: async (req, res) => {
        const { id } = req.params
        try{
            const usuarioActivado = await Usuarios.findByIdAndUpdate(id, {estado: 1});
            res.json({usuarioActivado})
        } catch (error) {
            res.json({ message: error.message})
        }
    },

    deleteEliminarUsuario: async (req, res) => {
        const { email } = req.params
        try {
            const usuarioEliminado = Usuarios.findByIdAndDelete(email);
            res.json({ message: 'El usuario fue eliminado'})
        } catch (error) {
            res.json({ message: error.message})
        }
    }
}

module.exports = { httpUsuarios }