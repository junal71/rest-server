const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async( req = request, res = response, next ) =>{

    const token = req.header('x-token');
    
    if( !token ){
        return res.status(401).json({

            msg: 'No se envio autorización'
        });
    }

    try{
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        
        //leer el usuario autenticado de la base de datos
        const usuarioA = await Usuario.findById(uid);

        //Asegurarse que el usuario exista

        if(!usuarioA){
            return res.status(401).json({

                msg: 'Usuario no existe'
            });

        }

        // Verificar que el usuario este activo
        if(!usuarioA.estado){
            return res.status(401).json({

                msg: 'Usuario no autorizado'
            });

        }


        req.usuario = usuarioA;
        

        next();

    }catch(error){

        console.log(error);
        res.status(401).json({
            msg: 'Se presento un error en la autorización'
        });


    }




}


module.exports = {
    validarJWT
}