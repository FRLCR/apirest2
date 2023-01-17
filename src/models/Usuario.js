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
   }]
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