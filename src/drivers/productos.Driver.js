import Producto from '../models/Producto.js'

export const getProductList = async (req,res) => {
    const productList = await Producto.find()
    res.json(productList)   
}

export const newProduct = async (req,res) => {
    //Hardcodeada de ID    LE ASIGNO A UNA VARIABLE NUEVA ID EN LA DB CORRESPONDIENTE A
    // LA LONGITUD DE LA COLECCION DE DATOS
  //  const productList =
    const {nombre, cantidad, precio} = req.body
  //  let id = (await Producto.find()).length
    let productoNuevo = new Producto({nombre, cantidad, precio}) // FALTA AGREGAR ID   
   // productoNuevo._id = 1
    const productoGuardado = await productoNuevo.save() 
  //  await Producto.findByIdAndUpdate(productoGuardado._id, {id: productList++})
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