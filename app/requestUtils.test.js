const { describe, it } = require("node:test");
const { deepStrictEqual } = require("node:assert");
const { parseRequest } = require("./requestUtils");

describe("parseRequest", () => {
    it("parses a request", () => {
        const request = 'POST /products/lala?test=1&test2=nice HTTP/1.1\r\nHost: localhost:3000\r\nUser-Agent: curl/8.4.0\r\nAccept: application/json\r\nContent-Length: 35\r\nContent-Type: application/x-www-form-urlencoded\r\n\r\n{ "name": "iphone", "price": 1200 }';
        const parsedRequest = parseRequest(request);
        deepStrictEqual(parsedRequest, {
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
        });
    });
});
