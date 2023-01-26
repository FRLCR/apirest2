import { Router } from "express";
import {verifyToken, onlyMods} from '../middlewares/index.js'
import * as venta from '../drivers/ventas.Driver.js'

const router = Router()

//  [verifyToken, onlyMods],
router.get("/", venta.getSellList)
router.post('/', venta.newVenta)
router.post('/updateState/:productId', venta.updateEstado)
router.get('/stats/lenghts', venta.getStateLenght)
router.delete('/:productId', venta.deleteVenta)
router.put('/:productId', venta.updateVenta)
router.get('/:productId', venta.getVenta)

export default router