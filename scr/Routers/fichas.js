const { Router } = require(`express`);
const { check } = require(`express-validator`);
const { validarCampos } = require(`./../middlewares/validar-campos`);
const { fichasHelper } = require(`./../helpers/fichas.js`);
const { aprendicesHelper } = require(`./../helpers/aprendices.js`);
const { httpFichas } = require(`./../Controllers/fichas.js`);
const { validarJWT } = require("../middlewares/validarJWT.js");
const router = Router()

router.get('/listartodo', httpFichas.getListarTodo);
router.get('/listarporid/:id', httpFichas.getListarPorId);

router.post('/crearficha',[
    check('codigo', 'El codigo solo debe contener caracteres numericos').isNumeric(),
    check('codigo', 'El codigo ingresado ya existe').custom(aprendicesHelper.Codigo),
    check('codigo', 'Todos los datos del formulario son obligatorios!').notEmpty(),
    check('nombre','ingrese su nombre').isEmpty(),
validarJWT,
validarCampos
], httpFichas.postCrearFicha);

router.put('/actualizarficha/:id',[
    validarJWT,
    validarCampos
], httpFichas.putActualizarFicha);
router.put('/activarficha/:id',[
    validarJWT,
validarCampos
], httpFichas.putActivarFichas);
router.put('/desactivarficha/:id',[
    validarJWT,
validarCampos
], httpFichas.putDesactivarFichas);


module.exports = router