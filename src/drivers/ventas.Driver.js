import Producto from '../models/Producto.js'
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
    let nombresProducto = []
    let {totalRecaudado, comprador, listadoProductos, cantidadesCompradas, subTotales} = req.body
    const camposVacios = !totalRecaudado && !listadoProductos && !cantidadesCompradas && !subTotales
    console.log(camposVacios)
    if (camposVacios){
       return res.json(operacionFail)
    } else if (!camposVacios && !comprador){
        comprador = cargadoPorSistema // ID CARGA POR SISTEMA
    }
    console.log(listadoProductos[0])
     for (let i = 0; i < listadoProductos.length; i++){        
      let producto = await Producto.findById(listadoProductos[i])
      nombresProducto.push(producto.nombre)
    }
    console.log(nombresProducto)
     await (new Venta({totalRecaudado, comprador, nombresProducto, cantidadesCompradas, subTotales})).save()

  //  await actualizarStock(listadoProductos, cantidadesCompradas, subTotales) // NUEVO */
    res.json(operacionOk)
}

// NUEVOP
async function actualizarStock(listadoProductos, cantidadesCompradas, subTotales){
    for ( let i = 0; i < listadoProductos.length; i++) {
        let producto = await Producto.findById(listadoProductos[i])
        producto.cantidad -= cantidadesCompradas[i]
        producto.historicoVentas += cantidadesCompradas[i]
        producto.historicoRecaudado += subTotales[i]
        await producto.save()
  }
}

export const deleteVenta = async (req,res) => {
    try{
        // 63cec7d08c257101f1060f39
        const idVenta = req.params.productId
        let venta = await Venta.findById(idVenta)
                
        for (let i = 0; i < venta.subTotales.length; i++){
            console.log("HOLA")
            let restaSubtotales = venta.subTotales[i] - (venta.subTotales[i]*2)
            let restaCantidadesCompradas = venta.cantidadesCompradas[i] - (venta.cantidadesCompradas[i]*2)
            await actualizarStock(listadoProductos, restaSubtotales, restaCantidadesCompradas)
        }
        // PROBAR PRIMERO CON ACTUALIZARSTOCK LUEGO CON LO DE ABAJO.
        // POPULATE FINDBYID, AGARRO DATOS Y ACTUALIZOm DESPUES BORRAMOS LA VENTA.
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