import {Schema, model} from 'mongoose'

export const ROLES = ['Usuario', 'Admin', 'Moderador']

const rolSchema = new Schema({
    nombre: String,
}, {
    versionKey: false
})

export default model('Rol', rolSchema)