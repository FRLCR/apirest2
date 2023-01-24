import { Router } from "express";
import * as producto from '../drivers/productos.Driver.js'
import {verifyToken, onlyMods} from '../middlewares/index.js'

const router = Router()

//  [verifyToken, onlyMods],
router.get("/", producto.getProductList)
router.post('/', producto.newProduct)


router.delete('/:productId', producto.deleteProduct)
router.put('/:productId', producto.updateProduct)
router.get('/:productId', producto.getProduct)
router.get('/stats/masvendidos', producto.productosMasVendidos)
router.get('/stats/masrecaudados', producto.productosMasGanancia)

export default router