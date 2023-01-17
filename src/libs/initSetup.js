import Rol from '../models/Rol.js'

export const createRoles = async() => {

 try{
    const cantidadRoles = await Rol.estimatedDocumentCount()

    if (cantidadRoles <= 0){
        const autoRol = await Promise.all([
        new Rol({nombre: 'Admin'}).save(),
        new Rol({nombre: 'Moderador'}).save(),
        new Rol({nombre: 'Usuario'}).save()
        ])
        console.log(autoRol)
        
    } else{
        return;
    }
 } catch(error){
    console.error(error)
 }
}