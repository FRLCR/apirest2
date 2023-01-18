import { Router } from "express";
import * as producto from '../drivers/productos.Driver.js'
import {verifyToken, onlyMods} from '../middlewares/index.js'

const router = Router()

//  [verifyToken, onlyMods],
router.get("/", producto.getProductList)
router.post('/', producto.newProduct)
router.delete('/:productId', producto.deleteProduct)
router.delete('/test/:productId', producto.deleteProductById) // DELETE CON DBFIX
router.put('/:productId', [verifyToken, onlyMods], producto.updateProduct)
router.get('/:productId', [verifyToken, onlyMods], producto.getProduct)


export default router