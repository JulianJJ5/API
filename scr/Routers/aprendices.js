const { Router } = require(`express`);
const { check } = require(`express-validator`);
const { validarCampos } = require(`../middlewares/validar-campos.js`);
const { aprendicesHelper } = require(`../helpers/aprendices.js`);
const { httpAprendiz } = require(`../Controllers/aprendices.js`);
const router = Router()

router.get('/listartodo', httpAprendiz.getListarTodo);

router.get('/listarporficha/:codigo', [
    check('documento').custom(aprendicesHelper.existeCodigoFicha),
    validarCampos
], httpAprendiz.getListarPorFicha);

router.get('/listarporid/:id', [
    check('id', 'el ID no es valido').isMongoId(),
    check('id', 'El ID es obligatorio').notEmpty(),
    validarCampos,
    check('id').custom(aprendicesHelper.existeAprendizID)
], httpAprendiz.getListarPorId);


router.post('/crearaprendiz',[
    check('documento', 'El documento es obligatorio').notEmpty(),
    check('id_ficha').custom(aprendicesHelper.existeCodigoFicha),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('id_ficha', 'La ficha a la que pertenece el aprendiz es obligatoria').notEmpty(),
    validarCampos
], httpAprendiz.postCrearAprendiz);


router.put('/actualizaraprendiz/:id',[    
    check('documento', 'El documento es obligatorio').notEmpty(),
    check('documento', 'El documento solo debe contener caracteres numéricos').isNumeric(),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('estado', 'El estado solo debe contener caracteres numéricos').isNumeric(),
    check('id_ficha', 'La ficha a la que pertenece el aprendiz es obligatoria').notEmpty(),
    validarCampos], httpAprendiz.putActualizarAprendiz);

router.put('/activaraprendiz/:id', [
    check('id', 'El ID no es valido').isMongoId(),
    check('id', 'El ID es obligatorio').notEmpty(),
    validarCampos
], httpAprendiz.putActivarAprendiz);

router.put('/desactivaraprendiz/:id', [
    check('id', 'El ID no es valido').isMongoId(),
    check('id', 'El ID es obligatorio').notEmpty(),
    validarCampos
], httpAprendiz.putDesactivarAprendiz);


module.exports = router