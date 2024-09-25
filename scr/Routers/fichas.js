const { Router } = require(`express`);
const { check } = require(`express-validator`);
const { validarCampos } = require(`./../middlewares/validar-campos`);
const { httpFichas } = require(`./../Controllers/fichas.js`);
const { validarJWT } = require("../middlewares/validarJWT.js");
const router = Router();

router.get('/listartodo', [
    validarJWT,
    validarCampos
], httpFichas.getListarTodo);

router.get('/listarporid/:id', [
    validarJWT,
    check('id', 'El ID no es válido').isMongoId(),
    check('id', 'El ID es obligatorio').notEmpty(),
    validarCampos
], httpFichas.getListarPorId);

router.post('/crearficha', [
    validarJWT,
    check('codigo', 'El código solo debe contener caracteres numéricos').isNumeric(),
    check('codigo', 'El código es obligatorio').notEmpty(),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], httpFichas.postCrearFicha);

router.put('/actualizarficha/:id', [
    validarJWT,
    check('id', 'El ID no es válido').isMongoId(),
    check('id', 'El ID es obligatorio').notEmpty(),
    check('codigo', 'El código solo debe contener caracteres numéricos').optional().isNumeric(),
    check('nombre', 'El nombre es obligatorio').optional().notEmpty(),
    validarCampos
], httpFichas.putActualizarFicha);

router.put('/activarficha/:id', [
    validarJWT,
    check('id', 'El ID no es válido').isMongoId(),
    check('id', 'El ID es obligatorio').notEmpty(),
    validarCampos
], httpFichas.putActivarFichas);

router.put('/desactivarficha/:id', [
    validarJWT,
    check('id', 'El ID no es válido').isMongoId(),
    check('id', 'El ID es obligatorio').notEmpty(),
    validarCampos
], httpFichas.putDesactivarFichas);

module.exports = router;
