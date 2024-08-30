const { Router } = require(`express`);
const { check } = require(`express-validator`);
const { validarCampos } = require(`./../middlewares/validar-campos`);
const { bitacoraHelper } = require(`./../helpers/bitacora.js`);
const { httpBitacora } = require(`./../Controllers/bitacora.js`);
const router = Router()

router.get('/listarTodo', httpBitacora.getListarTodo)
router.get('/listarporfechas', httpBitacora.getListarPorFechas);
router.get('/listarporfichaentrefechas/:codigo',[
    check('documento').custom(bitacoraHelper.existeCodigoFicha),
    validarCampos
], httpBitacora.getListarPorFichaEntreFechas);
router.get('/listarporaprendizentrefechas/:id',[
    check('id', 'El ID no es valido').isMongoId(),
    check('id', 'El ID es obligatorio').notEmpty(),
    check('id', 'El ID solo debe contener caracteres numéricos').isNumeric(),
    validarCampos
], httpBitacora.getListarPorAprendizEntreFechas);

router.post('/crearBitacora', httpBitacora.postCrearBitacora)

module.exports = router