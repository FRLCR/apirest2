import { Router } from "express";
import * as auth from '../drivers/auth.Driver.js' 
import * as validators from '../middlewares/validator.js'

const router = Router()

router.post('/register', [validators.checkDuplicateEmail, validators.checkRoles], auth.register)
router.post('/login', auth.login)

// ACCESS TOKEN DE PEDRO 
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzg2MTAzMjBjOWNiNTI2MmUzYzgzNyIsImlhdCI6MTY3NDY4MDI5OCwiZXhwIjoxNjc0NzY2Njk4fQ.mwoudp6DOKTyQ5Ww3I_WuOedsJEbdeTrBFPsIt-p8vI

// ACCESS TOKEN DE UN ADMIN
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDFiNzgwZDQzNmYwMjMwNDU2NjNmMSIsImlhdCI6MTY3NDY4ODM4NCwiZXhwIjoxNjc0Nzc0Nzg0fQ.NxFtl5sExsEoi0kArCMugH0acmER1w0HSp3OHFkNYgo
router.post('/validate', auth.getDataToken)



export default router