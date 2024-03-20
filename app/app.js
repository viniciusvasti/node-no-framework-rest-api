const net = require("net");
const { parseRequest, responseString } = require("./requestUtils");
const routes = require("./routes");

const port = process.env.PORT || 3000;

const server = net.createServer((socket) => {
    socket.on("data", (data) => {
        try {
            const request = parseRequest(data);
            const route = routeRegexMatcher(request.path);

            if (!route) {
                socket.write(response404());
                return socket.end();
            }

            const method = route[request.method];
            if (!method) {
                socket.write(response404());
                return socket.end();
            }
            const response = method(request);
            socket.write(responseString(response));
            return socket.end();
        } catch (error) {
            console.error(error);
            socket.write(
                responseString({
                    status: 500,
                    body: {
                        message: "Internal Server Error",
                    },
                })
            );
        }
        socket.end();
    });
    socket.on("close", () => {
        socket.end();
    });
});

function response404() {
    return responseString({
        status: 404,
        body: {
            message: "Not Found",
        },
    });
}

function run() {
    server.listen(port, "localhost", () => {
        console.log(`Server running on port ${port}`);
    });
}

function close(done) {
    server.close(done);
}

module.exports = { run, close };

function routeRegexMatcher(path) {
    const routesPaths = Object.keys(routes);
    const routePath = routesPaths.find((route) =>
        new RegExp(`^${route}$`).test(path)
    );
    if (!routePath) {
        return null;
    }
    return routes[routePath];
}
