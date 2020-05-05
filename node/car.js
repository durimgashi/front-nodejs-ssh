'use strict'

class Car {
    constructor({carId, brand, type, fuel, year, price, color, numDoor, description, picturePath}) {
        this.carId = carId;
        this.brand = brand;
        this.type = type;
        this.fuel = fuel;
        this.year = year;
        this.price= price;
        this.color = color;
        this.numDoor = numDoor;
        this.description = description;
        this.picturePath = picturePath;
    }
}
module.exports = Car;