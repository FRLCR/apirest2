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

     // Esencial para resumenes y estadisticas
     listadoProductosString: [{type: String}],
     cantidadesCompradas: [{type: Number}],
     cantidadesCompradasTotal: Number,
     subTotales: [{type: Number}],   

     //Esencial manejo de Stock y Logistica
    estado: String, // Asociada a los enum de estadodeventa.js    
    estaPago: {type: Boolean, default: false}
    
}, {
    timestamps: true,
    versionKey: false
})
export default model('Venta', ventaSchema);