import {Schema, model} from 'mongoose'

const productoSchema = new Schema({
    id: Number,
    nombre: String,
    cantidad: String,
    precio: Number,


}, {
    timestamps: true,
    versionKey: false
})


export default model('Producto', productoSchema)