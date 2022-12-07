const { response } = require('express');


const usuariosGET = (req, res = response) => {

    const {id = 111, cargo, proyecto} = req.query;
    res.json({
        ok: true,
        msg: 'Ejecución GET exitosa - Desde el controlador',
        id,
        cargo,
        proyecto
    })
  }

  const usuariosPOST = (req, res = response) => {

    const {nombre, profesion} = req.body;

    res.status(201).json({
        
        msg: 'Ejecución POST exitosa - Desde el controlador',
        nombre,
        profesion


    })
  }

  const usuariosPUT= (req, res = response) => {
    const id = req.params.id;
    res.json({
        ok: true,
        msg: 'Ejecución PUT exitosa - Desde el controlador',
        id: id
    })
  }

  const usuariosPATCH= (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Ejecución PATCH exitosa - Desde el controlador'
    })
  }

  const usuariosDELETE= (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Ejecución DELETE exitosa - Desde el controlador'
    })
  }



  module.exports = {
    usuariosGET,
    usuariosPOST,
    usuariosPUT,
    usuariosPATCH,
    usuariosDELETE
  }