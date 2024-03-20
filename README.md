# Car Rental REST API
This is a simple demo REST API for a car rental service. It is built using vanilla JS and Node. No Frameworks, nor libraries.

## How to run
1. Clone the repository
2. Run `npm start` in the root directory

## Endpoints
### GET /car-classes
Returns a list of all car classes available for rental in the form of:
```json
[
    {
        "id": 1,
        "name": "Economy",
        "price": 100
    },
    {
        "id": 2,
        "name": "Luxury",
        "price": 200
    }
]
```

### POST /car-classes
Creates a new car class. It expects a JSON body in the form of:
```json
{
    "name": "Economy",
    "price": 100
}
```

### GET /car-classes/:id/cars
Returns a list of all cars available for rental in a given car class. It returns a list of cars in the form of:
```json
[
    {
        "id": 1,
        "make": "Toyota",
        "model": "Corolla",
        "year": 2019,
        "rented": false
    },
    {
        "id": 2,
        "make": "Toyota",
        "model": "Camry",
        "year": 2019,
        "rented": false
    }
]
```

### GET /car-classes/:id/cars/:id
Returns a single car in a given car class. It returns a car in the form of:
```json
{
    "id": "2",
    "make": "Honda",
    "model": "Civic",
    "year": 2020,
    "classId": "1"
}
```

### POST /car-classes/:id/cars
Creates a new car in a given car class. It expects a JSON body in the form of:
```json
{
    "make": "Toyota",
    "model": "Corolla",
    "year": 2019
}
```

### POST /car-classes/:id/cars/:id/rent
Rents a car in a given car class. It expects a JSON body in the form of:
```json
{
    "renter": "John Doe"
}
```