const Aprendices = require('../Models/Aprendices.js');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./../Config/cloudinaryConfig.js');
const variableVacia = ''

// Configurar almacenamiento en Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'firmas', // Carpeta donde se almacenarán las firmas en Cloudinary
    allowedFormats: ['jpg', 'png'], // Formatos permitidos
    public_id: (req, file) => {
      return 'firma_' + Date.now(); // Renombra el archivo con un identificador único
    },
  },
});
const upload = multer({ storage: storage });

//CRUAI listar todos, ficha y id

const httpAprendiz = {
    getListarTodo: async (req, res) => {
        try {
            const aprendices = await Aprendices.find();
            res.json(aprendices);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    getListarPorFicha: async (req, res) => {
        const { id_ficha } = req.params
        try {
            const ficha = await Aprendices.findById(id_ficha)
            if (ficha) {
                res.json(ficha)
            }
        } catch (error) {
            res.status(404).json({ message: 'No se encontró la ficha' })
        }
    },

    getListarPorId: async (req, res) => {
        const { id_aprendiz } = req.params
        try {
            const aprendiz = await Aprendices.findById(id_aprendiz)
            if (aprendiz) {
                res.json(aprendiz)
            }
        } catch (error) {
            res.status(404).json({ message: 'No se encontró el aprendiz' })
        }
    },

    postCrearAprendiz: async (req, res) => {
        const aprendiz = new Aprendices({
            documento: req.body.documento,
            nombre: req.body.nombre,
            telefono: req.body.telefono,
            email: req.body.email,
            id_ficha: req.body.id_ficha,
            firma: req.file ? req.file.path : null, // URL de la firma en Cloudinary
        });
        try {
            const nuevoAprendiz = await aprendiz.save();
            res.json(nuevoAprendiz)
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    putActualizarAprendiz: async (req, res) => {
        const { id } = req.params;
        try {
            const aprendiz = await Aprendices.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.json(aprendiz)
        } catch (error) {
            res.json({ message: error.message })
        }
    },

    putActivarAprendiz: async (req, res) => {
        const { id } = req.params
        try {
            const aprendiz = await Aprendices.findByIdAndUpdate(id, { estado: 1 });
            res.json(aprendiz)
        } catch (error) {
            res.json({ message: error.message })
        }
    },

    putDesactivarAprendiz: async (req, res) => {
        const { id } = req.params
        try {
            const aprendiz = await Aprendices.findByIdAndUpdate(id, { estado: 0 });
            res.json(aprendiz)
        } catch (error) {
            res.json({ message: error.message })
        }
    }
}

module.exports = { httpAprendiz, upload };