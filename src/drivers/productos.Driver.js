import Producto from '../models/Producto.js'

const operacionOk= "La operacion se realizó con éxito"
const operacionFail = "ERROR"

export const getProductList = async (req,res) => {
    const productList = await Producto.find()
    res.status(200).json(productList)   
}

export const newProduct = async (req,res) => {
    try{
    const {nombre, cantidad, precio} = req.body
    await (new Producto({nombre, cantidad, precio})).save()
    res.json(operacionOk)
    } catch(error){
       res.status(404).json(operacionFail)
    }
}

export const deleteProduct = async (req,res) => {
    try{
    await Producto.findByIdAndDelete(req.params.productId)
    res.status(200).json(operacionOk)    
    } catch(error){
      res.status(404).json(operacionFail)
    } 
}

export const updateProduct = async (req,res) => {
    const actualizarProducto = await Producto.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    })
    res.status(200).json(operacionOk)
}

export const getProduct = async (req,res) => {
    const productoBuscado = await Producto.findById(req.params.productId)
    res.status(200).json(productoBuscado)
}