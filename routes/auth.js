/* 
path: api/login
*/



const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'Debe crear un password').not().isEmpty(),
    check('email', 'ingrese un email').isEmail(),
    validarCampos
] ,crearUsuario);

router.post('/',[

    check('password', 'Debe crear un password').not().isEmpty(),
    check('email', 'ingrese un email').isEmail(),

], login);


router.get('/renew', validarJWT, renewToken);




module.exports = router;