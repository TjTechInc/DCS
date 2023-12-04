from dbm import _Database
from django.db import models
CREATE _Database chatbot;


USE chatbot;
# -- Table for client data
CREATE TABLE client (
    GROWER_NO INT PRIMARY KEY,
    SURNAME VARCHAR(255),
    NAME_INITIALS VARCHAR(10),
    NATIONAL_ID VARCHAR(20),
    TEL_NO VARCHAR(15),
    EMAIL VARCHAR(255),
    POSTAL_ADDRESS1 VARCHAR(255),
    POSTAL_ADDRESS2 VARCHAR(255),
    FARM_NAME VARCHAR(255),
    AREA_PROVINCE VARCHAR(50),
    CURRENT_REG VARCHAR(50),
    NEXT_REG VARCHAR(50),
    CONTRACTOR VARCHAR(255),
    HECTARES FLOAT,
    PROVINCE VARCHAR(50)
);

#  Table for loan statements
CREATE TABLE loan_statement (
    GROWER_NO INT,
    LOAN_SCHEME VARCHAR(255),
    INPUT_TYPE VARCHAR(255),
    PRODUCT_CODE VARCHAR(20),
    DESCRIPTION TEXT,
    PACKAGING_UNITS VARCHAR(20),
    UNITS_ISSUED FLOAT,
    CURRENCY VARCHAR(10),
    UNIT_PRICE FLOAT,
    QTY_ISSUED FLOAT,
    INVOICE_AMOUNT FLOAT,
    CREDITOR_NO VARCHAR(20),
    RECEIPT_NO VARCHAR(20),
    CHAIRMAN VARCHAR(255),
    AREA_MGR VARCHAR(255),
    COLLECTION_POINT VARCHAR(255),
    FOREIGN KEY (GROWER_NO) REFERENCES client(GROWER_NO)
);

CREATE TABLE user_auth (
    user_id INT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255)
);