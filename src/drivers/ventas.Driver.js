import Venta from '../models/Venta.js'
import Producto from '../models/Producto.js'
import Usuario from '../models/Usuario.js'
import * as ResumenDeVenta from '../models/ResumenVenta.js'

const operacionOk= "La operacion se realizó con éxito"
const operacionFail = "ERROR"
const cargadoPorSistema = "63cac8dec53bd27aa8428f49" // ID CARGA POR SISTEMA

export const getSellList = async (req,res) => {
    const sellList = await Venta.find()
    res.status(200).json(sellList)   
}

export const newVenta = async (req,res) => {

    let {totalRecaudado, comprador, listadoProductos, cantidadesCompradas} = req.body
    const camposVacios = !totalRecaudado && !listadoProductos && !cantidadesCompradas
    console.log(camposVacios)
    if (camposVacios){
       return res.json(operacionFail)
    } else if (!camposVacios && !comprador){
        comprador = cargadoPorSistema // ID CARGA POR SISTEMA
    }
    await (new Venta({totalRecaudado, comprador, listadoProductos, cantidadesCompradas})).save()
    res.json(operacionOk)
}

export const resumenDeVenta = async (req,res) => {
    //CARGAMOS LOS OBJETOS DE LAS VENTAS
    const venta = await Venta.findById(req.params.productId) // Cargamos venta
    const comprador = await Usuario.findById(venta.comprador) // Cargamos al comprador

    // Creamos el resumen de venta
    let resumen = new ResumenDeVenta.ResumenVenta()
        resumen.comprador = comprador.email // Seteamos el nombre del comprador
        resumen.productosComprados = [] // Inicializamos los arrayList del objeto para utilizar tranqulo el metodo Push
        resumen.cantidadesCompradas = [] // Inicializamos los arrayList del objeto para utilizar tranqulo el metodo Push
        resumen.totalRecaudado = venta.totalRecaudado // Seteamos el total recaudado de la venta en el resumen de venta

    // Iniciamos la carga de productos y sus respectivas cantidades
    for (let i = 0; i < venta.listadoProductos.length; i++) {
        let productoComprado = await Producto.findById(venta.listadoProductos[i]) // Cargamos el producto
        resumen.productosComprados.push(productoComprado.nombre) // Insertamos en el objeto el nombre del producto
        resumen.cantidadesCompradas.push(venta.cantidadesCompradas[i]) // Insertamos en el objeto el INDEX de la cantidad comprada 
    }
    console.log("RESUMEN DE VENTA: ")
   res.json(resumen)   
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