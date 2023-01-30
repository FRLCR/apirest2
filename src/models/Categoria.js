import {Schema, model} from 'mongoose'

const categoriaSchema = new Schema({
    //Escencial para el Producto
    nombre: {type: String, required: true}
}, {
    timestamps: true,
    versionKey: false
})

export default model('Categoria', categoriaSchema)