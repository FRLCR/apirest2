import {ROLES} from '../models/Rol.js'
import Usuario from '../models/Usuario.js';
import * as config from '../config.js'

export const checkRoles = (req, res, next) =>{
    if (req.body.roles){
        let success = false;
        for (let i = 0; i < req.body.roles.length ; i++){
            success = ROLES.includes(req.body.roles[i])
        }
        if (!success) {
            return res.status(400).json({
                message: "Invalid"
            })
        }        
    }    
    next();
}

export const checkDuplicateEmail = async (req, res, next) =>{
   const hayEmail = await Usuario.findOne({email: req.body.email })
   if (hayEmail) {
        return res.status(400).json({message: "El usuario ya existe"})
    }
    next()
}