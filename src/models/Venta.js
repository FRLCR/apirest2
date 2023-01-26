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
     subTotales: [{type: Number}],   
     motivoEdicion: String,

     //Esencial manejo de Stock y Logistica
    estado: String,
     
}, {
    timestamps: true,
    versionKey: false
})

export default model('Venta', ventaSchema);