create database rentcars;
use rentcars;

select * from user;
select * from car;
select * from rent;

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


insert into car (brand, type, fuel, year, price, color, numDoor, insurance, description, picturePath, status) values ('Tesla', 'Model X', 'Electric', 2019, 119.99, "BLUE", 4, 'Collision Coverage', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'tesla.jpg', 1);
insert into car (brand, type, fuel, year, price, color, numDoor, insurance, description, picturePath, status) values ('Mercedes', 'C Class', 'Electric', 2020, 99.99, "BLACK", 4, 'Liability Insurance', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'mercedes.jpg', 1);
insert into car (brand, type, fuel, year, price, color, numDoor, insurance, description, picturePath, status) values ('Greenwood', 'Sweet', 'Diesel', 1992, 44.99, "GREEN", 4, 'Collision Coverage', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'greenwood.jpg', 1);
insert into car (brand, type, fuel, year, price, color, numDoor, insurance, description, picturePath, status) values ('Audi', 'Q5', 'Diesel', 2010, 99.99, "GREEN", 4, 'Liability Insurance', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'audiq5.jpg', 1);
insert into car (brand, type, fuel, year, price, color, numDoor, insurance, description, picturePath, status) values ('Wolkswagen Golf', 'Golf 7', 'Diesel', 2008, 49.99, "WHITE", 4, 'Collision Coverage', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'golf7.jpg', 1);
insert into car (brand, type, fuel, year, price, color, numDoor, insurance, description, picturePath, status) values ('Tesla', 'Model S', 'Electric', 2020, 109.99, "RED", 4, 'Liability Insurance', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'teslamodels.jpg', 1);
insert into car (brand, type, fuel, year, price, color, numDoor, insurance, description, picturePath, status) values ('Tesla', 'Cybertruck', 'Electric', 2020, 99.99, "GRAY", 4, 'Collision Coverage', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'cybertruck.jpg', 1);
insert into car (brand, type, fuel, year, price, color, numDoor, insurance, description, picturePath, status) values ('Audi', 'A7', 'Diesel', 2017, 74.99, "GRAY", 4, 'Liability Insurance', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'audia7.jpg', 1);
insert into car (brand, type, fuel, year, price, color, numDoor, insurance, description, picturePath, status) values ('Wolksvagen', 'Golf 2', 'Diesel', 1980, 19.99, "RED", 2, 'Collision Coverage', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'golf2.jpg', 1);
insert into car (brand, type, fuel, year, price, color, numDoor, insurance, description, picturePath, status) values ('Opel', 'Corsa', 'Diesel', 2004, 19.99, "BLUE", 2, 'Personal Injury Protection', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '../images/corsa.jpg', 1);
insert into car (brand, type, fuel, year, price, color, numDoor, insurance, description, picturePath, status) values ('Corsa', 'e Durimit', 'Diesel', 2005, 24.99, "GRAY", 2, 'No insurance', 'Per Endrinin edhe Fisini free, veq tregoni qe ju ka qu Dura. Ska lidhje edhe nese e gjrrithni pak, veq neper Gracanice mos i bini se ma ka marr inati ni polic', 'corsajem.png', 1);

