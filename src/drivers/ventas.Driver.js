import Venta from '../models/Venta.js'
import Producto from '../models/Producto.js'
import Usuario from '../models/Usuario.js'
import ResumenDeVenta from '../models/Usuario.js'

const operacionOk= "La operacion se realizó con éxito"
const operacionFail = "ERROR"

export const getSellList = async (req,res) => {
    const sellList = await Venta.find()
    res.status(200).json(sellList)   
}
/* export const newVenta = async (req,res) => {
    try{
    const {totalRecaudado, comprador, listadoProductos} = req.body
    await (new Venta({totalRecaudado, comprador, listadoProductos})).save()
    res.json(operacionOk)
    } catch(error){
       res.status(404).json(operacionFail)
    }
} */

export const newVenta = async (req,res) => {

    const {totalRecaudado, comprador, listadoProductos, cantidadesCompradas} = req.body
    await (new Venta({totalRecaudado, comprador, listadoProductos, cantidadesCompradas})).save()
    res.json(operacionOk)
}

export const resumenDeVenta = async (req,res) => {
    const venta = await Venta.findById(req.params.productId)
    console.log(venta.totalRecaudado)
    console.log(venta.cantidadesCompradas)
    console.log(venta.comprador)
   // await (new Venta({totalRecaudado, comprador, listadoProductos})).save()
 //  console.log(emitirResumen(venta))
   res.json(emitirResumen(venta))
   
}

async function emitirResumen(venta){

    let usuarioComprador = await Usuario.findById(venta.comprador)
    let resumenDeVenta = new ResumenDeVenta()  
    resumenDeVenta.comprador= usuarioComprador.email
      for (let i = 0; i < venta.listadoProductos.length; i++) {
        let productoComprado = await Producto.findById(venta.listadoProductos[i])
        ResumenDeVenta.addProductList(productoComprado.nombre, venta.cantidadesCompradas[i])
    }
    /*     comprador: String,
    productosComprados: [{type: String}]  ,
    cantidadesCompradas: [{type: Number}],
    totalRecaudado: Number, */
    console.log("RESUMEN DE VENTA")
    console.log(resumenDeVenta.comprador)
    console.log(resumenDeVenta.productosComprados)
    console.log(resumenDeVenta.cantidadesCompradas)
}

export const deleteVenta = async (req,res) => {
    try{
    await Venta.findByIdAndDelete(req.params.productId)
    res.status(200).json(operacionOk)    
    } catch(error){
      res.status(404).json(operacionFail)
    } 
}

export const updateVenta = async (req,res) => {
    const actualizarVenta = await Venta.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    })
    res.status(200).json(operacionOk)
}

export const getVenta = async (req,res) => {
    const venta = await Venta.findById(req.params.productId)
    res.status(200).json(venta)
}