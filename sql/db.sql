use rentcars;

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
    insurance varchar(30) not null,
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
    pickupLocation varchar(30),
    totalPrice REAL,
    FOREIGN KEY (userId) REFERENCES user(userId),
    FOREIGN KEY (carId) REFERENCES car(carId)
);
    
select * from user;
delete from user where userId=2;

insert into car (brand, type, fuel, year, price, color, numDoor, description, picturePath) values ('Tesla', 'Model X', 'Electric', 2019, 30000.0, "BLUE", 4, 'Lorem ipsum dolor sit amet', '../images/tesla.jpg');
insert into car (brand, type, fuel, year, price, color, numDoor, description, picturePath) values ('Mercedes', 'C Class', 'Electric', 2020, 30000.0, "BLACK", 4, 'Lorem ipsum dolor sit amet', '../images/mercedes.jpg');
insert into car (brand, type, fuel, year, price, color, numDoor, description, picturePath) values ('Greenwood', 'Sweet', 'Diesel', 1992, 30000.0, "GREEN", 4, 'Lorem ipsum dolor sit amet', '../images/greenwood.jpg');
insert into car (brand, type, fuel, year, price, color, numDoor, description, picturePath) values ('Audi', 'Q5', 'Diesel', 2010, 13000.0, "GREEN", 4, 'Lorem ipsum dolor sit amet', '../images/audi-q5.jpg');
insert into car (brand, type, fuel, year, price, color, numDoor, description, picturePath) values ('Wolkswagen Golf', 'Golf 7', 'Diesel', 2008, 1000.0, "WHITE", 4, 'Lorem ipsum dolor sit amet', '../images/golf7.jpg');
insert into car (brand, type, fuel, year, price, color, numDoor, description, picturePath) values ('Tesla', 'Model S', 'Electric', 2020, 75000.0, "RED", 4, 'Lorem ipsum dolor sit amet', '../images/tesla-model-s.jpg');