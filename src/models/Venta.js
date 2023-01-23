import {Schema, model} from 'mongoose'

const ventaSchema = new Schema({
    totalRecaudado: Number,

    comprador: [{ // USUARIOS
        ref: "Usuario",
        type: Schema.Types.ObjectId
       }],

     nombresProductos: [{type: String}], 
     cantidadesCompradas: [{type: Number}],

     // Para resumenes y estadisticas
     subTotales: [{type: Number}],   
     motivoEdicion: String
}, {
    timestamps: true,
    versionKey: false
})

export default model('Venta', ventaSchema);