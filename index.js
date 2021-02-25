var express = require('express');
const { Socket } = require('socket.io');
var app = express();
// Fazer expresse rodar com servidor nativo do node
// necessario pra funcionar corretamente
// pois o socket.io utiliza ela e o expresse precisa rodar o mesmo
var http = require("http").createServer(app)
var io = require("socket.io")(http);

io.on("connection", (socket) =>{
    // console.log(socket);
    // console.log(socket.id);
    
    // verificar quando o usuario se disconectou
    socket.on("disconnect", () => {
        console.log("usuario se desconectou " + socket.id);
    })

    socket.on("msg", (data) => {
        // socket.emit("showmsg", data) // resposta para usuario
        io.emit("showmsg", data) // resposta para todos
        
        console.log(data);
    })

})

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
})



http.listen(3002, () => {
    console.log("app rodando na porta 3002")
})

