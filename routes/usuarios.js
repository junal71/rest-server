const{ Router } = require('express');
const { check } = require('express-validator');
const{  usuariosGET, 
        usuariosPOST, 
        usuariosPUT, 
        usuariosPATCH, 
        usuariosDELETE } = require('../controllers/usuarios');
const { esRolValido, correoExiste, existeId, existeUsuarioById } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get('/', usuariosGET);


router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser mayor a 6 letra').isLength({ min: 6 }),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom( correoExiste),
        //check('rol', 'El rol no es valido').isIn([ 'ADMIN_ROL', 'USER_ROL']),
        check('rol').custom( esRolValido ),
        validarCampos
], usuariosPOST)

router.put('/:id',[
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom( existeUsuarioById ),
        check('rol').custom( esRolValido )
], validarCampos ,usuariosPUT)

router.patch('/', usuariosPATCH)

router.delete('/:id',[
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom( existeUsuarioById ),
],validarCampos, usuariosDELETE)


module.exports = router;