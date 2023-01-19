import {Schema, model} from 'mongoose'

const productoSchema = new Schema({
    nombre: String,
    cantidad: String,
    precio: Number,
    cantidadVendida: Number,
    totalRecaudado: Number,

}, {
    timestamps: true,
    versionKey: false
})

export default model('Producto', productoSchema)