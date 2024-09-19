const { Router } = require(`express`);
const { check } = require(`express-validator`);
const { validarCampos } = require(`./../middlewares/validar-campos`);
const { bitacoraHelper } = require(`./../helpers/bitacora.js`);
const { httpBitacora } = require(`./../Controllers/bitacora.js`);
const router = Router()

router.get('/listartodo', httpBitacora.getListarTodo)
router.get('/listarporfechas', httpBitacora.getListarPorFecha);
router.get('/listarporficha/:id',[
    check('documento').custom(bitacoraHelper.existeCodigoFicha),
    validarCampos
], httpBitacora.getListarPorFicha);
router.get('/listarPorEstado', [
    validarCampos
], httpBitacora.getListarBitacorasPorEstado)
router.get('/listarporaprendiz/:id',[
    check('id', 'El ID no es valido').isMongoId(),
    check('id', 'El ID es obligatorio').notEmpty(),
    check('id', 'El ID solo debe contener caracteres numéricos').isNumeric(),
    validarCampos
], httpBitacora.getListarPorAprendiz);

router.post('/crearBitacora', httpBitacora.postCrearBitacora)
router.put('/actualizarEstado/:id', httpBitacora.putActualizarEstadoBitacora)
module.exports = router