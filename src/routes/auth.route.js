import { Router } from "express";
import * as auth from '../drivers/auth.Driver.js' 
import * as validators from '../middlewares/validator.js'

const router = Router()

router.post('/register', [validators.checkDuplicateEmail, validators.checkRoles], auth.register)
router.post('/login', auth.login)



export default router