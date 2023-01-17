import mongoose from 'mongoose'
mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://francotds:franco123@dbf.rc79oqk.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser : true,
    useUnifiedTopology: true,
})
.then(db => console.log("CONECTADO"))
.catch(error => console.log(error))