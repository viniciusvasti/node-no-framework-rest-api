const request = {
    method: "POST",
    path: "/products/lala?test=1&test2=nice",
    protocol: "HTTP/1.1",
    headers: {
        Host: "localhost:3000",
        "User-Agent": "curl/8.4.0",
        Accept: "application/json",
        "Content-Length": "35",
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: '{ "name": "iphone", "price": 1200 }',
    query: { test: "1", test2: "nice" },
    pathWithoutQuery: "/products/lala",
};

/**
 * @typedef {Object} Request
 * @property {string} method
 * @property {string} path
 * @property {string} protocol
 * @property {Object} headers
 * @property {string} body
 * @property {Object} query
 * @property {string} pathWithoutQuery
 */

/**
 * POST /products/lala?test=1&test2=nice HTTP/1.1
 * Host: localhost:3000
 * User-Agent: curl/8.4.0
 * Accept: application/json
 * Content-Length: 35
 * Content-Type: application/x-www-form-urlencoded
 * 
 * { "name": "iphone", "price": 1200 }
 *
 * @param {Buffer} requestBuffer
 * @returns {Request} request
 */
function parseRequest(requestBuffer) {
    const request = requestBuffer.toString();
    console.log(request);
    const [method, path, protocol] = request.split("\r\n")[0].split(" ");
    const [pathWithoutQuery, query] = path.split("?");
    const headers = request
        .split("\r\n")
        .slice(1, -2)
        .reduce((acc, line) => {
            const [key, value] = line.split(": ");
            acc[key] = value;
            return acc;
        }, {});
    const body = request.split("\r\n").slice(-1)[0];
    return {
        method,
        path,
        protocol,
        headers,
        body,
        query: query
            ? query.split("&").reduce((acc, pair) => {
                  const [key, value] = pair.split("=");
                  acc[key] = value;
                  return acc;
              }, {})
            : {},
        pathWithoutQuery,
    };
}

module.exports = { parseRequest };
