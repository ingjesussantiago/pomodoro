import express from "express"
import { __dirname } from "./utils.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import activity from "./routers/view.router.js"
import pomodoro from  "./routers/productos.Router.js";

const app = express()
console.log(__dirname);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + "/public"))

app.use("/activity",activity)
app.use("/pomodoro", pomodoro)


app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")


const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log("escuchando puerto con htpp y socket io")
})


const socketServer = new Server(httpServer)

socketServer.on("connection", async (Socket) => {
    console.log(`cliente conectado a servidor:${Socket.id}`)


    Socket.on('disconnect', () => {
        console.log(`Un cliente se ha desconectado:${Socket.id}`)
    })

});








