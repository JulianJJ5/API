const { Router } = require(`express`);
const { check } = require(`express-validator`);
const { validarCampos } = require(`./../middlewares/validar-campos`);
const { bitacoraHelper } = require(`./../helpers/bitacora.js`);
const { httpBitacora } = require(`./../Controllers/bitacora.js`);
const { validarJWT } = require("../middlewares/validarJWT.js");
const router = Router();

router.get('/listartodo', [
    validarJWT,
    validarCampos
], httpBitacora.getListarTodo);

router.get('/listarporficha/:id_ficha', [
    validarJWT,
    validarCampos
], httpBitacora.getListarPorFicha);

router.get('/listarporfecha/:fecha', [
    check('fecha', 'La fecha es obligatoria').notEmpty(),
    check('fecha', 'La fecha debe ser una fecha válida').isISO8601(),
    validarJWT,
    validarCampos
], httpBitacora.getListarPorFecha);

router.get('/listarPorEstado', [
    validarJWT,
    validarCampos
], httpBitacora.getListarBitacorasPorEstado);

router.get('/listarporaprendiz/:id', [
    validarJWT,
    check('id', 'El ID no es válido').isMongoId(),
    check('id', 'El ID es obligatorio').notEmpty(),
    validarCampos
], httpBitacora.getListarPorAprendiz);

router.post('/crearBitacora', [
    validarJWT,
    check('id_aprendiz', 'El ID del aprendiz es obligatorio').notEmpty(),
    check('fecha', 'La fecha es obligatoria').notEmpty(),
    check('fecha', 'La fecha debe ser una fecha válida').isISO8601(),
    check('id_aprendiz').custom(async (id_aprendiz, { req }) => {
        await bitacoraHelper.yaExisteBitacoraHoy(req.body.fecha, id_aprendiz);
        return true;
    }),
        validarCampos
], httpBitacora.postCrearBitacora);

router.put('/actualizarEstado/:id', [
    validarJWT,
    check('id', 'El ID no es válido').isMongoId(),
    check('id', 'El ID es obligatorio').notEmpty(),
    check('estado', 'El estado es obligatorio').notEmpty(),
    validarCampos
], httpBitacora.putActualizarEstadoBitacora);

module.exports = router;
