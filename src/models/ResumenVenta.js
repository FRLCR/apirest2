import {Schema, model} from 'mongoose'

const resumenVentaSchema = new Schema({
    comprador: String,
    productosComprados: [{type: String}]  ,
    cantidadesCompradas: [{type: Number}],
    totalRecaudado: Number,
}, {
    timestamps: false,
    versionKey: false
})

function addProductList(nombreProducto, cantidadComprada){
    this.productosComprados.push(nombreProducto)
    this.cantidadesCompradas.push(cantidadComprada)
}

export default model('Resumen de Venta', resumenVentaSchema)