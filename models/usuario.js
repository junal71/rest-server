const {Schema, model} = require('mongoose');


const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },

    correo: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'El password es requerido'],
        
    },

    img: {
        type: String
        
    },

    rol: {
        type: String,
        required: [true, 'El rol es requerido']//,
        //enum: ['ADMIN_ROL', 'USER_ROL']
        
    },

    estado: {
        type: Boolean,
        //  reuired: [true, 'El estado es requerido'],
        default: true
                
    },

    google: {
        type: Boolean,
        default: false
        
    }

});

usuarioSchema.methods.toJSON = function() {

    const{ __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', usuarioSchema);