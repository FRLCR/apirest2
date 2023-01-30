import express from 'express'
import morgan from 'morgan'
import {createRoles} from './libs/initSetup.js'
import cors from 'cors'

// Importar rutas
import productosRutas from './routes/producto.route.js'
import authRutas from './routes/auth.route.js'
import ventasRutas from './routes/venta.Route.js'
import categoriasRuta from './routes/categoria.Route.js'

const app = express()
createRoles()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use("/api/productos", productosRutas)
app.use("/api/auth", authRutas)
app.use("/api/ventas", ventasRutas)
app.use("/api/categorias", categoriasRuta)
app.get("/", (req,res) => {
    res.json("HOLA!")
})


export default app