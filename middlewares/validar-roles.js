const { response } = require("express")


const esAdmin = ( req, res = response, next) => {

if(!req.usuario){
    return res.status(500).json({

        msg: 'Validación de rol sin validación de token'
    });

}

const { rol, nombre } = req.usuario;

    if( rol !== 'ADMIN_ROL'){
        return res.status(401).json({
            msg: `usuario: ${nombre} Rol de usuario no autorizado`
        });
    }


next();

} 

const tieneRol = ( ...roles ) => {
    return ( req, res = response, next ) => {

        if(!req.usuario){
            return res.status(500).json({
        
                msg: 'Validación de rol sin validación de token'
            });
        
        }

        if( !roles.includes(req.usuario.rol) ){
            return res.status(401).json({
                msg: `El servicio requiere uno de los siguientes roles ${roles}`
            });
        }

        next();
    }

    
}

module.exports = {
    esAdmin,
    tieneRol
}