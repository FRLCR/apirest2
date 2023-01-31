import { Router } from "express";
import * as categoria from '../drivers/categorias.Driver.js'
import {verifyToken, onlyMods} from '../middlewares/index.js'

const router = Router()

//  [verifyToken, onlyMods],
router.get("/", [verifyToken, onlyMods, categoria.getCategoriaList])
router.post('/', [verifyToken, onlyMods, categoria.newCategoria])
router.delete('/:productId', [verifyToken, onlyMods, categoria.deleteCategoria])
router.put('/:productId', [verifyToken, onlyMods, categoria.updateCategoria])
router.get('/:productId', [verifyToken, onlyMods, categoria.getCategoria])

export default router