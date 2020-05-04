create database rentcars;

create table user(
    userId INTEGER PRIMARY KEY AUTO_INCREMENT not null,
    firstName varchar(30) not null,
    lastName varchar(30) not null,
    username varchar(30) not null,
    email varchar(50) not null,
    password varchar(50) not null,
    age INTEGER not null,
    city varchar(30) not null
);

create table car(
    carId INTEGER PRIMARY KEY AUTO_INCREMENT not null,
    brand varchar(30) not null,
    type varchar(30) not null,
    fuel varchar(30) not null,
    year INTEGER not null,
    price real not null,
    color varchar(30) not null,
    numDoor INTEGER not null,
    description varchar(512) not null,
    picturePath varchar(256)
);

create table rent(
    rentId INTEGER PRIMARY KEY AUTO_INCREMENT not null,
    userId INTEGER,
    carId INTEGER,
    date DATETIME NOT NULL,
    returnDate DATETIME not null,
    inCountry BOOL not null,
    insurance BOOL not null,
    deliveryLocation varchar(30),
    FOREIGN KEY (userId) REFERENCES user(userId),
    FOREIGN KEY (carId) REFERENCES car(carId)
    );