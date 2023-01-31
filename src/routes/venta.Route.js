import { Router } from "express";
import {verifyToken, onlyMods} from '../middlewares/index.js'
import * as venta from '../drivers/ventas.Driver.js'

const router = Router()
//  [verifyToken, onlyMods],
// VENTAS
router.get("/", [verifyToken, onlyMods, venta.getSellList])
router.post('/', [verifyToken, onlyMods, venta.newVenta])
router.delete('/:productId', [verifyToken, onlyMods, venta.deleteVenta])
router.put('/:productId', [verifyToken, onlyMods, venta.updateVenta])
router.get('/:productId', [verifyToken, onlyMods, venta.getVenta])
router.post('/updateState/:productId', [verifyToken, onlyMods, venta.updateEstado])
// ESTADISTICAS
router.get('/stats/lenghts',[verifyToken, onlyMods, venta.getStateLenght])

// Por defecto, al iniciar el menu Estadisticas
router.get('/stats/recaudacion', [verifyToken, onlyMods, venta.getResumen])
router.post('/stats/recaudacion', [verifyToken, onlyMods, venta.getResumen]) // AL SOLICITAR PERIODO ESPECIFICO


export default router