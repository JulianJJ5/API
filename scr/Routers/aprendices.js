const { Router } = require(`express`);
const { check } = require(`express-validator`);
const { validarCampos } = require(`../middlewares/validar-campos.js`);
const { aprendicesHelper } = require(`../helpers/aprendices.js`);
const { httpAprendiz } = require(`../Controllers/aprendices.js`);
const { validarJWT } = require("../middlewares/validarJWT.js");
const router = Router();

router.get('/listartodo', httpAprendiz.getListarTodo);

router.get('/listarporficha/:codigo', [
    check('codigo', 'El código de la ficha es obligatorio').notEmpty(),
    check('codigo').custom(aprendicesHelper.existeCodigoFicha),
    validarJWT,
    validarCampos
], httpAprendiz.getListarPorFicha);

router.get('/listarporid/:id', [
    check('id', 'El ID no es válido').isMongoId(),
    check('id', 'El ID es obligatorio').notEmpty(),
    validarJWT,
    validarCampos,
    check('id').custom(aprendicesHelper.existeAprendizID)
], httpAprendiz.getListarPorId);

router.post('/crearaprendiz', [
    check('documento', 'El documento es obligatorio').notEmpty(),
    check('documento', 'El documento debe contener máximo 10 caracteres').isLength({ max: 10 }),
    check('documento', 'El documento solo debe contener caracteres numéricos').isNumeric(),
    
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('nombre', 'El nombre debe tener máximo 50 caracteres').isLength({ max: 50 }),
    
    check('email', 'El correo electrónico es obligatorio').notEmpty(),
    check('email', 'El correo electrónico no es válido').isEmail(),
    
    check('telefono', 'El teléfono es obligatorio').notEmpty(),
    check('telefono', 'El teléfono debe ser numérico').isNumeric(),
    
    check('id_ficha', 'La ficha a la que pertenece el aprendiz es obligatoria').notEmpty(),
    check('id_ficha').custom(aprendicesHelper.existeCodigoFicha),
    validarJWT,
    validarCampos
], httpAprendiz.postCrearAprendiz);

router.put('/actualizaraprendiz/:id', [    
    check('id', 'El ID no es válido').isMongoId(),
    check('documento', 'El documento es obligatorio').notEmpty(),
    check('documento', 'El documento solo debe contener caracteres numéricos').isNumeric(),
    check('documento', 'El documento debe contener máximo 10 caracteres').isLength({ max: 10 }),
    
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('nombre', 'El nombre debe tener máximo 50 caracteres').isLength({ max: 50 }),
    
    check('email', 'El correo electrónico es obligatorio').notEmpty(),
    check('email', 'El correo electrónico no es válido').isEmail(),
    
    check('telefono', 'El teléfono es obligatorio').notEmpty(),
    check('telefono', 'El teléfono debe ser numérico').isNumeric(),
        
    check('id_ficha', 'La ficha a la que pertenece el aprendiz es obligatoria').notEmpty(),
    validarCampos,
    validarJWT
], httpAprendiz.putActualizarAprendiz);

router.put('/activaraprendiz/:id', [
    check('id', 'El ID no es válido').isMongoId(),
    check('id', 'El ID es obligatorio').notEmpty(),
    validarCampos,
    validarJWT
], httpAprendiz.putActivarAprendiz);

router.put('/desactivaraprendiz/:id', [
    check('id', 'El ID no es válido').isMongoId(),
    check('id', 'El ID es obligatorio').notEmpty(),
    validarCampos,
    validarJWT
], httpAprendiz.putDesactivarAprendiz);

module.exports = router;
