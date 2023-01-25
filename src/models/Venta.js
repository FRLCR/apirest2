import {Schema, model} from 'mongoose'

const ventaSchema = new Schema({
    
    totalRecaudado: Number,
    comprador: [{ // USUARIOS
        ref: "Usuario",
        type: Schema.Types.ObjectId
       }],

    vendedor: [{ // VENDEDOR DEL TIPO USUARIO
        ref: "Usuario",
        type: Schema.Types.ObjectId
       }],    
    
    listadoProductos: [{
        ref: "Producto",
        type: Schema.Types.ObjectId 
     }],
     // Para resumenes y estadisticas
     cantidadesCompradas: [{type: Number}],
     subTotales: [{type: Number}],   
     motivoEdicion: String
}, {
    timestamps: true,
    versionKey: false
})

export default model('Venta', ventaSchema);