/* import {Schema, model} from 'mongoose'

const resumenVentaSchema = new Schema({
    comprador: String,
    productosComprados: [{type: String}]  ,
    cantidadesCompradas: [{type: Number}],
    totalRecaudado: Number,
}, {
    timestamps: false,
    versionKey: false
})

resumenVentaSchema.function.addProductList = (nombreProducto, cantidadComprada) =>{
    this.productosComprados.push(nombreProducto)
    this.cantidadesCompradas.push(cantidadComprada)
}
export default model('Resumen de Venta', resumenVentaSchema) */


export function ResumenVenta(){
    let comprador;
    let productosComprados = []
    let cantidadesCompradas = []
    let totalRecaudado
}

export function addProduct(producto, cantidad){
        this.productosComprados.push(producto)
        this.cantidadesCompradas.push(cantidad)
    }

export default class{}