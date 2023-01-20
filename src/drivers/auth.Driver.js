import Usuario from '../models/Usuario.js'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import Rol from '../models/Rol.js'

const erroCredenciales = "Usuario y/o contraseña incorrectos!"
const loginSuccess = "Ingresado con exito"

export const register = async (req,res) => {
try{
    const {email, password, roles} = req.body
    const newUser = new Usuario({
        email,
        password: await Usuario.hashPassword(password)
    }) 
    console.log(roles)
    if(roles){
        const hayRol = await Rol.find({nombre: {$in: roles }})
        newUser.roles = hayRol.map(roles => roles._id)
    } else {
        newUser.roles = "63bd88e2d17eb1a0e19d3cb2" // Hardcodeamos el ID del rol 'Usuario'
    }

    const usuarioGuardado = await newUser.save();
    const token = jwt.sign({id : usuarioGuardado._id}, config.SECRET_TOKEN, {expiresIn: config.TIEMPO_EXPIRA})

    console.log(usuarioGuardado)
    res.status(200).json({token})
  } catch(error){
    res.status(404).json({message: "ERROR"})
  }
}

export const login = async (req,res) => {
  const buscarUsuario =  await Usuario.findOne({email: req.body.email})
  const success = buscarUsuario && await Usuario.validarPassword(req.body.password, buscarUsuario.password)  
  console.log(success)

  if(success){
    const token = jwt.sign({id: buscarUsuario._id}, config.SECRET_TOKEN, {expiresIn: config.TIEMPO_EXPIRA})
    res.status(200).json({token: token,
        message: "Ha ingresado correctamente!"})
  } else {
    return res.status(400).json(erroCredenciales)
  }
}