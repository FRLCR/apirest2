import {Schema, model} from 'mongoose'

const dbfixSchema = new Schema({
    id: Number,

}, {
    timestamps: false,
    versionKey: false
})


export default model('Dbfix', dbfixSchema)