import mongoose from 'mongoose'
mongoose.set("strictQuery", true);
BORRADO POR SEGURIDAD
    useNewUrlParser : true,
    useUnifiedTopology: true, // SI
})
.then(db => console.log("CONECTADO"))
.catch(error => console.log(error))

// Conectar a la DB del Cliente
