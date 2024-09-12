const { Router } = require(`express`);
const { check } = require(`express-validator`);
const { validarCampos } = require(`./../middlewares/validar-campos`);
const { UserHelper } = require(`./../helpers/usuarios.js`);
const { httpUsuarios } = require(`./../Controllers/usuarios.js`);
const { validarJWT } = require('./../middlewares/validarJWT.js')
const router = Router()

router.get('/listartodo',[validarCampos], httpUsuarios.getListarTodo);

router.post('/crearusuario',[
    check('email', 'El email es obligatorio').notEmpty(),
    check('email', 'El email no es valido').isEmail(),
    check('email').custom(UserHelper.existeEmail),
    check('contrasena', 'El campo de contraseña es obligatorio').notEmpty(),
    check('nombre','El nombre es obligatorio').notEmpty(),
    validarJWT,
    validarCampos
], httpUsuarios.postCrearUsuario);

router.post('/loginusuario', validarCampos, httpUsuarios.postLoginUsuario);

router.put('/cambiarcontrasena/:id', [
    validarJWT,
     validarCampos
], httpUsuarios.putCambiarContrasena);

router.put('/actualizarusuario/:id', [
    validarJWT,
     validarCampos
], httpUsuarios.putActualizarUsuario);

router.put('/activarusuario/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(UserHelper.existeUsuarioID),
    validarJWT,
     validarCampos
], httpUsuarios.putActivarUsuario);

router.put('/desactivarusuario/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(UserHelper.existeUsuarioID),
     validarCampos
], httpUsuarios.putDesactivarUsuario);

router.delete('/eliminarusuario/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(UserHelper.existeUsuarioID),
    validarJWT,
     validarCampos
], httpUsuarios.deleteEliminarUsuario);


module.exports = router