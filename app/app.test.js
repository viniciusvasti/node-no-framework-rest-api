const { describe, it, before, after } = require("node:test");
const { deepStrictEqual, equal } = require("node:assert");
const server = require("./app");

const BASE_URL = "http://localhost:3000";

describe("app", () => {
    before(() => {
        server.run();
    });
    after((done) => {
        server.close(done);
    });

    describe("GET /car-classes", () => {
        it("GET should return car classes", async () => {
            const response = await fetch(`${BASE_URL}/car-classes`);
            const data = await response.json();
            equal(response.status, 200);
            deepStrictEqual(data, {
                carClasses: [
                    {
                        id: "1",
                        name: "economy",
                        price: 20,
                    },
                    {
                        id: "2",
                        name: "midsize",
                        price: 30,
                    },
                    {
                        id: "3",
                        name: "luxury",
                        price: 40,
                    },
                ],
            });
        });
    });

    describe("POST /car-classes", () => {
        it("should create a car class", async () => {
            const response = await fetch(`${BASE_URL}/car-classes`, {
                method: "POST",
                body: JSON.stringify({
                    name: "compact",
                    price: 25,
                }),
            });
            const data = await response.json();
            equal(response.status, 201);
            deepStrictEqual(data, {
                message: "Car class created",
            });
        });
    });

    describe("GET /car-classes/1/cars", () => {
        it("should return cars for car class", async () => {
            const response = await fetch(`${BASE_URL}/car-classes/1/cars`);
            const data = await response.json();
            equal(response.status, 200);
            deepStrictEqual(data, [
                {
                    id: "1",
                    make: "Toyota",
                    model: "Corolla",
                    year: 2019,
                    classId: "1",
                },
                {
                    id: "2",
                    make: "Honda",
                    model: "Civic",
                    year: 2020,
                    classId: "1",
                },
            ]);
        });
    });

    describe("GET /car-classes/1/cars/2", () => {
        it("should return car by id", async () => {
            const response = await fetch(`${BASE_URL}/car-classes/1/cars/2`);
            const data = await response.json();
            equal(response.status, 200);
            deepStrictEqual(data, {
                id: "2",
                make: "Honda",
                model: "Civic",
                year: 2020,
                classId: "1",
            });
        });
    });

    describe("POST /car-classes/1/cars", () => {
        it("should create a car", async () => {
            const response = await fetch(`${BASE_URL}/car-classes/1/cars`, {
                method: "POST",
                body: JSON.stringify({
                    make: "Ford",
                    model: "Focus",
                    year: 2021,
                }),
            });
            const data = await response.json();
            equal(response.status, 201);
            deepStrictEqual(data, {
                message: "Car created",
            });
        });
    });

    describe("POST /car-classes/1/cars/2/rent", () => {
        it("should rent a car", async () => {
            const response = await fetch(
                `${BASE_URL}/car-classes/1/cars/2/rent`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        renter: "John Doe",
                    }),
                }
            );
            const data = await response.json();
            equal(response.status, 201);
            deepStrictEqual(data, {
                message: "Car rented",
            });
        });
    });

    describe("GET /non-existing-route", () => {
        it("should return 404", async () => {
            const response = await fetch(`${BASE_URL}/non-existing-route`);
            equal(response.status, 404);
        });
    });
});
