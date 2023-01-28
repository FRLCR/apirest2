import { Router } from "express";
import {verifyToken, onlyMods} from '../middlewares/index.js'
import * as venta from '../drivers/ventas.Driver.js'

const router = Router()
//  [verifyToken, onlyMods],
// VENTAS
router.get("/", venta.getSellList)
router.post('/', venta.newVenta)
router.delete('/:productId', venta.deleteVenta)
router.put('/:productId', venta.updateVenta)
router.get('/:productId', venta.getVenta)
router.post('/updateState/:productId', venta.updateEstado)
// ESTADISTICAS
router.get('/stats/lenghts', venta.getStateLenght)

// Por defecto, al iniciar el menu Estadisticas
router.get('/stats/recaudacion', venta.getResumen)
router.post('/stats/recaudacion', venta.getResumen) // AL SOLICITAR PERIODO ESPECIFICO


export default router