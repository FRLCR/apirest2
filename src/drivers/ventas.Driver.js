import Venta from '../models/Venta.js'

const operacionOk= "La operacion se realizó con éxito"
const operacionFail = "ERROR"
const cargadoPorSistema = "63bd926891886547dc9b4ae3" // ID CARGA POR SISTEMA

export const getSellList = async (req,res) => {
    const sellList = await Venta.find({}).populate({path:'comprador', select:'email'})
                                         .populate({path:'listadoProductos', select:'nombre'} )
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