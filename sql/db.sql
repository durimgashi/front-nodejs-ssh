drop database rentcars;
create database rentcars;
use rentcars;

create table user(
    userId INTEGER PRIMARY KEY AUTO_INCREMENT not null,
    firstName varchar(30) not null,
    lastName varchar(30) not null,
    username varchar(30) not null,
    email varchar(50) not null,
    password varchar(200) not null,
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
    picturePath varchar(256),
    status BOOL
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

insert into car (brand, type, fuel, year, price, color, numDoor, insurance, description, picturePath) values ('Tesla', 'Model X', 'Electric', 2019, 30000.0, "BLUE", 4, 'Collision Coverage', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '../images/tesla.jpg');
insert into car (brand, type, fuel, year, price, color, numDoor, insurance, description, picturePath) values ('Mercedes', 'C Class', 'Electric', 2020, 30000.0, "BLACK", 4, 'Liability Insurance', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '../images/mercedes.jpg');
insert into car (brand, type, fuel, year, price, color, numDoor, insurance, description, picturePath) values ('Greenwood', 'Sweet', 'Diesel', 1992, 30000.0, "GREEN", 4, 'Collision Coverage', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '../images/greenwood.jpg');
insert into car (brand, type, fuel, year, price, color, numDoor, insurance, description, picturePath) values ('Audi', 'Q5', 'Diesel', 2010, 13000.0, "GREEN", 4, 'Liability Insurance', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '../images/audiq5.jpg');
insert into car (brand, type, fuel, year, price, color, numDoor, insurance, description, picturePath) values ('Wolkswagen Golf', 'Golf 7', 'Diesel', 2008, 1000.0, "WHITE", 4, 'Collision Coverage', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '../images/golf7.jpg');
insert into car (brand, type, fuel, year, price, color, numDoor, insurance, description, picturePath) values ('Tesla', 'Model S', 'Electric', 2020, 75000.0, "RED", 4, 'Liability Insurance', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '../images/teslamodels.jpg');
insert into car (brand, type, fuel, year, price, color, numDoor, insurance, description, picturePath) values ('Tesla', 'Cybertruck', 'Electric', 2020, 100.0, "GRAY", 4, 'Collision Coverage', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '../images/cybertruck.jpg');
insert into car (brand, type, fuel, year, price, color, numDoor, insurance, description, picturePath) values ('Audi', 'A7', 'Diesel', 2017, 75.0, "GRAY", 4, 'Liability Insurance', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '../images/audia7.jpg');
insert into car (brand, type, fuel, year, price, color, numDoor, insurance, description, picturePath) values ('Wolksvagen', 'Golf 2', 'Diesel', 1980, 20.0, "RED", 2, 'Collision Coverage', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '../images/golf2.jpg');
insert into car (brand, type, fuel, year, price, color, numDoor, insurance, description, picturePath) values ('Opel', 'Corsa', 'Diesel', 2004, 20.0, "BLUE", 2, 'Personal Injury Protection', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '../images/corsa.jpg');

