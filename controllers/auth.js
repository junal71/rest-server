const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");


 const login = async(req, res = response) => {
   
   const {correo, password} = req.body;


   try{

      //verificar si el email existe
      const usuario = await Usuario.findOne({correo});
      if(!usuario){
         return res.status(400).json({
            msg: 'Usuario / Password Invalido - correo'
         })
      }

      // verificar si el usuario activo

      const query = {estado: true};
      const usuarioActivo = usuario.estado
      if(!usuarioActivo){
         return res.status(400).json({
            msg: 'Usuario / Password Invalido - correo - estado fase'
         })
      }

      // verificar password

      const validPassword = bcryptjs.compareSync(password, usuario.password);

      if(!validPassword){
         return res.status(400).json({
            msg: 'Usuario / Password Invalido - password '
         })
      }

     //Generar JWT

     const token = await generarJWT( usuario.id);

     res.json({
      msg: 'Login Ok',
      usuario,
      token
  })
     
    


   } catch(error){
         console.log(error);
         return res.status(500).json ({
            msg: 'Comuniquese con el administrador'
         })
      
      }
 }

 module.exports = {
    login
 }