import { Router } from "express";
import * as categoria from '../drivers/categorias.Driver.js'
import {verifyToken, onlyMods} from '../middlewares/index.js'

const router = Router()

//  [verifyToken, onlyMods],
router.get("/", categoria.getCategoriaList)
router.post('/', categoria.newCategoria)
router.delete('/:productId', categoria.deleteCategoria)
router.put('/:productId', categoria.updateCategoria)
router.get('/:productId', categoria.getCategoria)

export default router