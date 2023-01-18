import { Router } from "express";
import * as producto from '../drivers/productos.Driver.js'
import {verifyToken, onlyMods} from '../middlewares/index.js'

const router = Router()

//  [verifyToken, onlyMods],
router.get("/", [onlyMods, verifyToken], producto.getProductList)
router.post('/', producto.newProduct)
router.delete('/:productId', producto.deleteProduct)
router.put('/:productId', producto.updateProduct)
router.get('/:productId', producto.getProduct)

export default router