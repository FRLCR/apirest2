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
router.post('/stats/recaudacion', venta.getResumen) // AL SOLICITAR PERIODO ESPECIFICO
router.post('/stats/resumenAnual', venta.getResumenAnual) // Por defecto, al iniciar el menu Estadisticas

export default router