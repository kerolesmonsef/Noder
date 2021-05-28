const http = require("http");
const websocketServer = require("websocket").server;
let connection = null;

const httpServer = http.createServer((req, res) => {
    console.log("we have received a request");
    res.end("thanks");
});

const websocket = new websocketServer({
    "httpServer": httpServer,
});

const acceptRequest = () => true;

websocket.on("request", (request) => {
    if (acceptRequest(request)) {
        connection = request.accept(null, request.origin);
    } else {
        request.reject(null, "you are a fucker");
        return;
    }

    connection.on("open", () => console.log("Opened!!!"))
    connection.on("close", () => console.log("CLOSED!!!"))

    connection.on("message", message => {
        console.log(`Received message ${message.utf8Data}`)
        connection.send(`got your message: ${message.utf8Data}`)
    })
});

websocket.on("connect", () => {
    console.log("connected");
})


websocket.on("close", () => {
    console.log("closed");
})

httpServer.listen(8080, () => {
    console.log("listing on port 8080");
});

setInterval(() => {
    if (connection)
        connection.send(`Random Number ${Math.random()}`)
}, 1000);