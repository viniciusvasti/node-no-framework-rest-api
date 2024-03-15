const net = require("net");

const port = process.env.PORT || 3000;

const server = net.createServer((socket) => {
    socket.on("close", () => {
        socket.end();
    });
});

server.listen(port, "localhost", () => {
    console.log(`Server running on port ${port}`);
});
