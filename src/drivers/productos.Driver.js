import Producto from '../models/Producto.js'
//DB FIX -- Borrar y adecuar cuando haya mejor opcion
import Dbfix from '../models/Dbfix.js'

export const getProductList = async (req,res) => {
    const productList = await Producto.find()
    res.json(productList)   
}

export const newProduct = async (req,res) => {
    // DbFix -- Borrar y adecuar cuando haya mejor opcion
    let id = ((await Dbfix.find()).length) + 1
    let fixNuevo = new Dbfix({id})
    await fixNuevo.save()
    // Fin DBFIX
    const {nombre, cantidad, precio} = req.body
    let productoNuevo = new Producto({id, nombre, cantidad, precio}) // ID DEPENDIENTE DEL Dbfix.lenght
    const productoGuardado = await productoNuevo.save() 
    res.json(productoGuardado)
}

export const deleteProduct = async (req,res) => {
    await Producto.findByIdAndDelete(req.params.productId)
    res.status(204).json()    
}

export const deleteProductById = async (req, res) => {
    await Producto.findOneAndDelete({id: req.params.productId})
    res.status(204).json()
}

export const updateProduct = async (req,res) => {
    const actualizarProducto = await Producto.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    })
    res.status(200).json(actualizarProducto)
}

export const getProduct = async (req,res) => {
    const productoBuscado = await Producto.findById(req.params.productId)
    res.status(200).json(productoBuscado)
}