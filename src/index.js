import app from './app.js'
import './database.js' 

/* const serverPort = 3000 */
const serverPort = 80

app.listen(serverPort)
console.log("Server online en el puerto ", serverPort )
