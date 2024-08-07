-- Database: testDB

--DROP DATABASE IF EXISTS "testDB";

--CREATE DATABASE "testDB"
--    WITH
--    OWNER = postgres
--    ENCODING = 'UTF8'
--    LC_COLLATE = 'Bulgarian_Bulgaria.1251'
--    LC_CTYPE = 'Bulgarian_Bulgaria.1251'
--    LOCALE_PROVIDER = 'libc'
--   TABLESPACE = pg_default
--   CONNECTION LIMIT = -1
--    IS_TEMPLATE = False;

 -- Изтрийте таблицата "vehicle", ако тя съществува
DROP TABLE IF EXISTS vehicle;
CREATE TABLE vehicle (
    vehicle_id SERIAL PRIMARY KEY,
    carmark_id INTEGER,
    carmodel_id INTEGER,
    transport_id INTEGER,
    regno VARCHAR(50),
    win VARCHAR(50),
    motor_no VARCHAR(50),
    reg_year INTEGER,
    modify TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    city VARCHAR(100),
    axes_number INTEGER,
    fuel VARCHAR(50),
    motor_capacity INTEGER,
    power_kw INTEGER,
    power_hp INTEGER,
    max_mass_camp INTEGER,
    bruto_ton INTEGER,
    katalizator BOOLEAN,
    user_date DATE,
    user_id INTEGER,
    max_posible_mass INTEGER
);

DROP TABLE IF EXISTS transport;
CREATE TABLE transport (
    transport_id SERIAL PRIMARY KEY,
    transport_na INTEGER,
    isactive BOOLEAN
);

DROP TABLE IF EXISTS carmark;
CREATE TABLE carmark (
    carmark_id SERIAL PRIMARY KEY,
    markname VARCHAR,
    transport_id INTEGER
);

DROP TABLE IF EXISTS  carmodel;
CREATE TABLE carmodel (
    carmodel_id SERIAL PRIMARY KEY,
    carmark_id INTEGER,
    carmodelcode INTEGER,
    carmodelname VARCHAR,
    isactive BOOLEAN
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    cretad DATE,
    modify DATE
);

DROP TABLE IF EXISTS items;
 CREATE TABLE items(
    user_id INTEGER,
    vehicle_id INTEGER,
    datafrom DATE,
    datato DATE,
    probeg INTEGER,
    opisaninie VARCHAR,
    item VARCHAR,
    stoinost INTEGER
    
 );


