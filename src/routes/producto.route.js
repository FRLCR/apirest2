import { Router } from "express";
import * as producto from '../drivers/productos.Driver.js'
import {verifyToken, onlyMods} from '../middlewares/index.js'

const router = Router()

//  [verifyToken, onlyMods, ],
router.get("/", producto.getProductLists)
router.post('/',  [verifyToken, onlyMods, producto.newProduct])


router.delete('/:productId', [verifyToken, onlyMods,  producto.deleteProduct])
router.put('/:productId',  [verifyToken, onlyMods, producto.updateProduct])
router.get('/:productId',  [verifyToken, onlyMods, producto.getProduct])
router.get('/stats/masvendidos', [verifyToken, onlyMods,  producto.productosMasVendidos])
router.get('/stats/masrecaudados',  [verifyToken, onlyMods, producto.productosMasGanancia])

export default router