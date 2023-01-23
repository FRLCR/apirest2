import {Schema, model} from 'mongoose'

const ventaSchema = new Schema({
    totalRecaudado: Number,

    comprador: [{ // USUARIOS
        ref: "Usuario",
        type: Schema.Types.ObjectId
       }],

  //   nombresProducto: [{type: String}], 
     listadoProductos: [{
        ref: "Producto",
        type: Schema.Types.ObjectId 
     }],

     cantidadesCompradas: [{type: Number}],

     // Para resumenes y estadisticas
     subTotales: [{type: Number}],   
     motivoEdicion: String
}, {
    timestamps: true,
    versionKey: false
})

export default model('Venta', ventaSchema);