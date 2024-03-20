const db = require("../db.json");

function handleGetClasses(request) {
    return {
        status: 200,
        body: {
            carClasses: db.carClasses,
        },
    };
}

function handlePostCarClass(request) {
    return {
        status: 201,
        body: { message: "Car class created" },
    };
}

function handleGetCarsByClassId(request) {
    const carClassId = request.path.split("/")[2];
    return {
        status: 200,
        body: db.cars.filter((car) => car.classId === carClassId),
    };
}

function handlePostCar(request) {
    return {
        status: 201,
        body: { message: "Car created" },
    };
}

function handleGetCarById(request) {
    const carId = request.path.split("/")[4];
    return {
        status: 200,
        body: db.cars.find((car) => car.id === carId),
    };
}

function handleRentCar(request) {
    return {
        status: 201,
        body: { message: "Car rented" },
    };
}

const routes = {
    "/car-classes": {
        GET: handleGetClasses,
        POST: handlePostCarClass,
    },
    "/car-classes/\\d+/cars": {
        GET: handleGetCarsByClassId,
        POST: handlePostCar,
    },
    "/car-classes/\\d+/cars/\\d+": {
        GET: handleGetCarById,
    },
    "/car-classes/\\d+/cars/\\d+/rent": {
        POST: handleRentCar,
    },
};

module.exports = routes;
