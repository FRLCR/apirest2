import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'

const usuarioSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password:{
        type: String,
        required: true
    }, 
    roles: [{
    ref: "Rol",
    type: Schema.Types.ObjectId
   }],

      // Exclusivo Clientes || DATOS DE ENVIO:
   datosEnvio: {
    nombre: {type: String, required: true}, 
    apellido: {type: String, required: true}, 
    dni: {type: Number, required: true}, 
    telefono: {type: Number, required: true},
    provincia:{type: String, required: true},
    ciudad:{type: String, required: true},   
    cp: {type: Number, required: true},
    direccion:{type: String, required: true},
    altura:{type: Number, required: true},
    notasExtra:{type: String},
   }

}, {
    timestamps: true,
    versionKey: false
})

usuarioSchema.statics.hashPassword = async (password) =>{
    const saltos  = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, saltos)
}
usuarioSchema.statics.validarPassword = async (password, hashPass) => {
   return await bcrypt.compare(password, hashPass)
}

export default model('Usuario', usuarioSchema);