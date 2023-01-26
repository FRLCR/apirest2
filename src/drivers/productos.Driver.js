import Producto from '../models/Producto.js'

const OPERACION_OK= "La operacion se realizó con éxito"
const OPERACION_FAIL = "ERROR"
const VALORES_MAX_LISTAS = 4

export const getProductList = async (req,res) => {
    res.status(200).json(await obtenerListadoProductos())   
}

async function obtenerListadoProductos(){
    return await Producto.find()
}

export const newProduct = async (req,res) => {
    try{
    const {nombre, cantidad, precio} = req.body
    await (new Producto({nombre, cantidad, precio})).save()
    res.json(OPERACION_OK)
    } catch(error){
       res.status(404).json(OPERACION_FAIL)
    }
}

export const deleteProduct = async (req,res) => {
    try{  
        if (await Producto.findByIdAndDelete(req.params.productId)){
            return res.status(200).json(OPERACION_OK)   
        } 
    res.status(404).json(OPERACION_FAIL)    
    } catch(error){
      res.status(404).json(OPERACION_FAIL)
    } 
}

export const updateProduct = async (req,res) => {
    await Producto.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    })
    res.status(200).json(OPERACION_OK)
}

export const getProduct = async (req,res) => {
    const productoBuscado = await Producto.findById(req.params.productId)
    res.status(200).json(productoBuscado)
}

export const productosMasVendidos = async (req,res) => {
    const listadoProductos = await Producto.find({}).sort({historicoVentas: -1}) // .sort -1 = Mayor a menor || .sort 1 = Menor a Mayor
    res.status(200).json(await generarListasMaximos(listadoProductos))
}

export const productosMasGanancia = async (req,res) => {
    const listadoProductos = await Producto.find({}).sort({historicoRecaudado: -1}) // .sort -1 = Mayor a menor || .sort 1 = Menor a Mayor
    res.status(200).json(await generarListasMaximos(listadoProductos))
}

async function generarListasMaximos(listadoProductos){
    let listaDeMaximos = []
    for (let i = 0; i < VALORES_MAX_LISTAS; i++){
        if (listadoProductos[i] != null){
            listaDeMaximos.push(listadoProductos[i])
        }
    }
   return listaDeMaximos
}