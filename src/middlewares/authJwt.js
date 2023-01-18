import jwt from 'jsonwebtoken'
import config from '../config.js'
import Rol from '../models/Rol.js'
import Usuario from '../models/Usuario.js'

const noAccess = "Acceso Restringido"
export const verifyToken = async (req, res, next) =>{
    try{
    const token = req.headers["x-access-token"]

    if (!token) return res.status(403).json(noAccess)

    const accessToken = jwt.verify(token, config.SECRET_TOKEN)
    req.userId = accessToken.id

    const user = await Usuario.findById(req.userId, {password: 0})
    if (!user){return res.status(404).json(noAccess)}
    next()
    
    } catch(error){
       res.status(401).json(noAccess)
    }    
}

export const onlyMods = async (req, res, next) => {
    const user =  await Usuario.findById(req.userId) 
    const [userRol] = await Rol.find({_id: {$in: user.roles}})  
    const success = userRol && (userRol.nombre == "Admin" || userRol.nombre == "Moderador")

    if (success){
        console.log(userRol.nombre)
     next()
    } else {
     return res.status(403).json(noAccess);
    }
}