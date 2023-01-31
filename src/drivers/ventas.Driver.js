import Producto from '../models/Producto.js'
import Venta from '../models/Venta.js'
import Rol from '../models/Rol.js'
import * as Auth from '../drivers/auth.Driver.js'

const OPERACION_OK= "La operacion se realizó con éxito"
const OPERACION_FAIL = "ERROR"
const CARGADO_POR_SISTEMA = "63d857130f0c61527292f9f9" // ID CARGA POR SISTEMA
const CARGADO_POR_WEB = "63d857560f0c61527292f9fc"  // ID CARGA POR WEB
const PRODUCTO_FUERA_DE_STOCK = "Uno o varios de los productos seleccionados no tienen stock suficiente"

const ESTADO_DE_PEDIDO = {
    NUEVO: "NUEVO PEDIDO",
    CONFIRMADO: "CONFIRMADO",
    DESPACHADO: "DESPACHADO",
    ENTREGADO: "ENTREGADO",
}

export const getSellList = async (req,res) => {
    try{
    const sellList = await Venta.find({}).populate({path:'comprador', select:'datosEnvio' }) 
                                         .populate({path: 'listadoProductos', select: 'nombre'})                                           
                                         .populate({path: 'vendedor', select: 'email'})
    res.status(200).json({sellList, ESTADO_DE_PEDIDO})
    } catch(error){
        res.status(404).json(OPERACION_FAIL)
    }
}

export const newVenta = async (req,res) => {
    let estado = ESTADO_DE_PEDIDO.NUEVO
    let vendedor
    //Cargo al usuario que haya realizado la compra
    const token = req.headers["x-access-token"] 
    const userToken = await Auth.getDataToken(token)

    //Agarro datos y verifico que no esten vacios.
    let {totalRecaudado, comprador, listadoProductos, cantidadesCompradas, subTotales} = req.body  
    const camposVacios = !totalRecaudado && !listadoProductos && !cantidadesCompradas && !subTotales

    // Chequeo de Stocks
    let hayStock = await chequearStock(listadoProductos, cantidadesCompradas)

    // Valido quien realizo la compra. Admin por sistema, o Usuario por web
    if (userToken != null && !camposVacios){
        const [userRol] = await Rol.find({_id: {$in: userToken.roles}})  
        const isAdmin = userRol && (userRol.nombre == "Admin" || userRol.nombre == "Moderador")  
            if (isAdmin){
               comprador = CARGADO_POR_SISTEMA // Compra cargada por sistema
               vendedor = userToken._id
            } else {
                  comprador = userToken._id // Usuario que realizó la compra.
                  vendedor = CARGADO_POR_WEB
                }
            }else if (!camposVacios) {        
                comprador = CARGADO_POR_WEB // Si no realizo un usuario registrado, o algun admin. Carga por Web Sin Registrar
                vendedor = CARGADO_POR_WEB
            } else {
                return res.json(OPERACION_FAIL)
            }        
            // CARGAMOS MANUALMENTE LOS STRING DE LOS NOMBRES PARA FIXEAR SI SE BORRA EL PRODUCTO POSTERIORMENTE
        let listadoProductosString = []  
        
        let cantidadesCompradasTotal = 0
        cantidadesCompradas.forEach(cantidad => {
            cantidadesCompradasTotal+= cantidad
        });
        for (let i = 0; i < listadoProductos.length; i++){
            let producto = await Producto.findById(listadoProductos[i])
            listadoProductosString.push(producto.nombre)
        }  

        if (hayStock){            
            await (new Venta({totalRecaudado, comprador, listadoProductos, cantidadesCompradas, subTotales, vendedor, listadoProductosString, estado, cantidadesCompradasTotal})).save()
            await actualizarStock(listadoProductos, cantidadesCompradas, subTotales)  
            res.json(OPERACION_OK)
         } else {
            res.status(400).json(PRODUCTO_FUERA_DE_STOCK)
         }
}
async function chequearStock(listadoProductos, cantidadesCompradas){
    let hayStock    
    let producto
     for (let i = 0; i < listadoProductos.length ; i++){
         producto = await Producto.findById(listadoProductos[i])
         hayStock = producto.cantidad >= cantidadesCompradas[i]
     }
     console.log(hayStock)
    return hayStock;
}

async function actualizarStock(listadoProductos, cantidadesCompradas, subTotales){
    try{ // NUEVO
     let producto = null;
     for ( let i = 0; i < listadoProductos.length; i++) {
            // SI EL PRODUCTO DEL LISTADO EXISTE, ACTUALIZAMOS SU STOCK, SI NO, SEGUIMOS CON LO DEMAS
            if (listadoProductos[i] != null){ // FIX VENTA IMPOSIBLE DE BORRAR
            producto = await Producto.findById(listadoProductos[i])
            producto.cantidad -= cantidadesCompradas[i]
            producto.historicoVentas += cantidadesCompradas[i]
           producto.historicoRecaudado += subTotales[i]
           await producto.save()
           } else {
            console.log("El producto ya no existe")
           }
     }
    }catch(error){
        console.log("ACA CRASHEO! en actualizar stock")
    }
}
export const deleteVenta = async (req,res) => {
    try{ // NUEVO
        const idVenta = req.params.productId
        let venta = await Venta.findById(idVenta)
        let restaSubtotales = []
        let restaCantidadesCompradas = []
         for (let i = 0; i < venta.listadoProductos.length; i++){ // VENTA CON PRODUCTO BORRADO FIX
            if (venta.listadoProductos[i] != null) { // SI EL PRODUCTO DE LA LISTA NO ESTA VACIO, ARMAMOS LOS SUBTOTALES 
            restaSubtotales.push(venta.subTotales[i] - (venta.subTotales[i]*2))
            restaCantidadesCompradas.push(venta.cantidadesCompradas[i] - (venta.cantidadesCompradas[i]*2))
            }  else { // SI ESTA VACIO, PUSHEAMOS UN 0
                restaSubtotales.push(0)
                restaCantidadesCompradas.push(0)
            }   
         }

    await actualizarStock(venta.listadoProductos, restaCantidadesCompradas, restaSubtotales)
    await Venta.findByIdAndDelete(req.params.productId) 
    res.status(200).json(OPERACION_OK)

    } catch(error){
        console.log("ACA CRASHEO! en deleteventa")
      res.status(404).json(OPERACION_FAIL)
    } 
}

export const updateVenta = async (req,res) => {
    try{
   await Venta.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    })
    res.status(200).json(OPERACION_OK)
} catch(error){
    res.status(400).json(OPERACION_FAIL)
}
}

export const updateEstado = async (req,res) => {
    try{
    const estadoOk = req.body.estado == ESTADO_DE_PEDIDO.CONFIRMADO || req.body.estado == ESTADO_DE_PEDIDO.DESPACHADO || req.body.estado == ESTADO_DE_PEDIDO.ENTREGADO
     if (estadoOk){
         await Venta.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
         })
         res.status(200).json(OPERACION_OK)
     } else {
         res.status(400).json(OPERACION_FAIL)
     }}catch(error){
        res.status(400).json(OPERACION_FAIL)
     }
}

export const getVenta = async (req,res) => {
    try{
    const venta = await Venta.findById(req.params.productId)
    res.status(200).json(venta)
    } catch(error){
        res.status(400).json(OPERACION_FAIL)
    }
}

export const getStateLenght = async (req, res) => {
    try {
        let PEDIDOS_NUEVOS = 0        
        let PEDIDOS_CONFIRMADOS = 0
        let PEDIDOS_DESPACHADOS = 0
        let PEDIDOS_ENTREGADOS = 0

        const totalesVentas = await Venta.aggregate([
            { $group: {
                _id: {estado: "$estado"},
                totales: {$sum: 1}
           }}
       ])       
       totalesVentas.forEach(venta => {
         if (venta._id.estado == ESTADO_DE_PEDIDO.NUEVO){
              PEDIDOS_NUEVOS = venta.totales
         } else if (venta._id.estado ==ESTADO_DE_PEDIDO.CONFIRMADO){
              PEDIDOS_CONFIRMADOS = venta.totales
           } else if (venta._id.estado ==ESTADO_DE_PEDIDO.DESPACHADO){
              PEDIDOS_DESPACHADOS = venta.totales
             } else {
                PEDIDOS_ENTREGADOS = venta.totales
             }
       });
    res.status(200).json({PEDIDOS_NUEVOS, PEDIDOS_CONFIRMADOS, PEDIDOS_DESPACHADOS, PEDIDOS_ENTREGADOS})
    } catch(error){
        res.status(400).json(OPERACION_FAIL)
    }
}

export const getResumen = async (req, res) => {
    try{         
        const {fechaGrande, fechaChica, periodo} = req.body  
        const esCargaInicial = (!fechaGrande && !fechaChica && !periodo)      
        let resumenBuscado 
        let format = "%Y"

        if (esCargaInicial){
            format = "%m-%Y"
            resumenBuscado = await emitirEstadisticas(fechaGrande, fechaChica, format, esCargaInicial)            
        } else if (periodo == 'ANUAL'){             
            resumenBuscado = await emitirEstadisticas(fechaGrande, fechaChica, format, esCargaInicial)          
          } else if (periodo == 'MENSUAL' && !esCargaInicial ){
                format = "%m-%Y"
                resumenBuscado = await emitirEstadisticas(fechaGrande, fechaChica, format, esCargaInicial)
            } else {
                format = "%d-%m-%Y"
                resumenBuscado = await emitirEstadisticas(fechaGrande, fechaChica, format) 
              }  
       res.status(200).json(resumenBuscado) 
    }catch(error){
        res.status(400).json(OPERACION_FAIL)
    }
} 

async function emitirEstadisticas(fechaGrande, fechaChica, format, esCargaInicial){
   let estadisticas
   const desde =  new Date(fechaChica)
   const hasta = new Date(fechaGrande)   

   //SI ES CARGA INICIAL:
    if (!fechaGrande && !fechaChica && esCargaInicial){
        const añoActual = new Date().getFullYear()
        let resumenCargaInicial = await Venta.aggregate([
          { $group: {
              _id: { $dateToString: { date: "$createdAt", format} /* format: "%m-%Y"}  */    },
               totalRecaudado: { $sum: "$totalRecaudado" },
                 cantidadesTotal: {$sum: "$cantidadesCompradasTotal"},
         }}
     ]).sort({_id: -1}) 
     estadisticas = []
     resumenCargaInicial.forEach(resumen => {
        if (resumen._id.includes(añoActual))
            estadisticas.push(resumen)
     });
    } else{ // SI NO:
      estadisticas = await Venta.aggregate([
        {$match:
            {'createdAt':
              { $gte: desde,
                $lte: hasta } } },
        { $group: {
            _id: { $dateToString: { date: "$createdAt", format} /* format: "%m-%Y"}  */    },
             totalRecaudado: { $sum: "$totalRecaudado" },
               cantidadesTotal: {$sum: "$cantidadesCompradasTotal"},
       }}
     ]).sort({_id: -1})                                                  
    }
return estadisticas
}