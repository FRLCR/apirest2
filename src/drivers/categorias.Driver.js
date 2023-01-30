import Categoria from '../models/Categoria.js'

const OPERACION_OK= "La operacion se realizó con éxito"
const OPERACION_FAIL = "ERROR"

/* 
router.get("/", categoria.getCategoriaList)
router.post('/', categoria.newProduct)
router.delete('/:productId', categoria.deleteProduct)
router.put('/:productId', categoria.updateProduct)
router.get('/:productId', categoria.getProduct) */


export const getCategoriaList = async (req,res) => {
    res.status(200).json(await Categoria.find()) 
}

export const newCategoria = async (req,res) => {
    const {nombreMinuscula} = req.body
    const CAMPO_VACIO = !nombreMinuscula
    console.log(CAMPO_VACIO)
    if (!CAMPO_VACIO){
        const nombre = nombreMinuscula.toUpperCase()
    await (new Categoria({nombre})).save()
    res.status(200).json(OPERACION_OK)
    }  else {
        res.status(400).json(OPERACION_FAIL)
    }
}

export const deleteCategoria = async (req,res) => {
    try{  
        if (await Categoria.findByIdAndDelete(req.params.productId)){
            res.status(200).json(OPERACION_OK)   
        }else {
            res.status(404).json(OPERACION_FAIL)
        }         
    } catch(error){
      res.status(404).json(OPERACION_FAIL)
    } 
}

export const updateCategoria = async (req,res) => {
    await Categoria.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    })
    res.status(200).json(OPERACION_OK)
}

export const getCategoria = async (req,res) => {
    res.status(200).json(await Categoria.findById(req.params.productId))
}