import {Schema, model} from 'mongoose'

const productoSchema = new Schema({
    //Escencial para el Producto
    nombre: String,
    cantidad: String,
    precio: Number,

    // Escencial estadisticas
    historicoRecaudado: {type: Number, default: 0},
    historicoVentas: {type: Number, default: 0},

}, {
    timestamps: true,
    versionKey: false
})

export default model('Producto', productoSchema)