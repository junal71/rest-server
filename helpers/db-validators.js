
const Role = require('../models/role');
const Usuario = require('../models/usuario');




const esRolValido = async (rol = '') =>{
    const existeRole = await Role.findOne({ rol });
    if(!existeRole) { 
            throw new Error('Nombre de rol no valido')
    }

}

const correoExiste = async ( correo = '') => {
    existeCorreo =await Usuario.findOne({correo});
    if (existeCorreo){

        //return res.status(400).json({
        //msg: "El correo ya existe"
        throw new Error('El correo ya existe')
     //});
    }
}

const existeUsuarioById = async ( id = '') => {
    existeId =await Usuario.findById(id);
    if (!existeId){

        //return res.status(400).json({
        //msg: "El correo ya existe"
        console.log(existeId);
        throw new Error('El id no existe')
     //});
    }
}

module.exports = {
    esRolValido,
    correoExiste,
    existeUsuarioById
}