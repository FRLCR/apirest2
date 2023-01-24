import app from './app.js'
import './database.js' 

const serverPort = 8080

app.listen(serverPort)
console.log("Server online en el puerto ", serverPort )
