const { Router } = require(`express`);
const { check } = require(`express-validator`);
const { validarCampos } = require(`./../middlewares/validar-campos`);
const { UserHelper } = require(`./../helpers/usuarios.js`);
const { httpUsuarios } = require(`./../Controllers/usuarios.js`);
const { validarJWT } = require('./../middlewares/validarJWT.js');
const router = Router();

router.get('/listartodo', [
    validarJWT,
    validarCampos
], httpUsuarios.getListarTodo);

router.post('/crearusuario', [
    validarJWT,
    check('email', 'El email es obligatorio').notEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom(UserHelper.existeEmail),  // Verifica si el email ya existe
    check('contrasena', 'El campo de contraseña es obligatorio').notEmpty(),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], httpUsuarios.postCrearUsuario);

router.post('/loginusuario', [
    check('email', 'El email es obligatorio').notEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('contrasena', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
], httpUsuarios.postLoginUsuario);

router.put('/cambiarcontrasena/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id', 'El ID es obligatorio').notEmpty(),
    check('contrasena', 'La nueva contraseña es obligatoria').notEmpty(),
    validarCampos
], httpUsuarios.putCambiarContrasena);

router.put('/actualizarusuario/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id', 'El ID es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').optional().isEmail(),
    check('nombre', 'El nombre es obligatorio').optional().notEmpty(),
    validarCampos
], httpUsuarios.putActualizarUsuario);

router.put('/activarusuario/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(UserHelper.existeUsuarioID),
    validarCampos
], httpUsuarios.putActivarUsuario);

router.put('/desactivarusuario/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(UserHelper.existeUsuarioID),
    validarCampos
], httpUsuarios.putDesactivarUsuario);

router.delete('/eliminarusuario/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(UserHelper.existeUsuarioID),
    validarCampos
], httpUsuarios.deleteEliminarUsuario);

module.exports = router;
