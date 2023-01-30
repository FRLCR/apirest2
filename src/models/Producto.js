import {Schema, model} from 'mongoose'

const productoSchema = new Schema({
    //Escencial para el Producto
    nombre: String,
    cantidad: Number,
    precio: Number,
    categoria: [{
        ref: "Categoria",
        type: Schema.Types.ObjectId
       }],

    // Escencial estadisticas
    historicoRecaudado: {type: Number, default: 0},
    historicoVentas: {type: Number, default: 0},

}, {
    timestamps: true,
    versionKey: false
})

export default model('Producto', productoSchema)