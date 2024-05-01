-- Create the database
CREATE DATABASE IF NOT EXISTS firstHomeSchema;

-- Select the database for subsequent operations
USE firstHomeSchema;


CREATE TABLE `Users`(
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255),
  `salt` varchar(255),
  `userType` varchar(255),
  `approved` boolean NOT NULL,
  UNIQUE (`email`)
);

-- Create the Listings table
CREATE TABLE `Listings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idSeller` int NOT NULL, -- Changed from int NOT NULL to varchar(255) NOT NULL
  `type` varchar(45) NOT NULL,
  `propertyType` varchar(255) NOT NULL,
  `price` int DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `bath` int DEFAULT NULL,
  `bed` int DEFAULT NULL,
  `squareFootage` int DEFAULT NULL,
  `leaseDuration` int DEFAULT NULL,
  `utilities` varchar(255) DEFAULT NULL,
  `dateAvailable` varchar(12) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `propertyDescription` varchar(255) DEFAULT NULL,
  `images` varchar(750) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_id_seller` FOREIGN KEY (`idSeller`) REFERENCES `Users` (`id`)
);

-- Create the Reports table
CREATE TABLE `Reports` (
  `idREPORT` int NOT NULL AUTO_INCREMENT,
  `idListing` int DEFAULT NULL,
  `reportReason` varchar(255) DEFAULT NULL,
  `dateReported` date DEFAULT NULL,
  `userID` varchar(255) NOT NULL, -- Changed from int DEFAULT NULL to varchar(255) DEFAULT NULL
  `reportCount` int DEFAULT NULL, -- Added new field
  PRIMARY KEY (`idREPORT`),
  UNIQUE KEY `uq_idListing` (`idListing`),
  KEY `idListing_idx` (`idListing`),
  CONSTRAINT `fk_listing_id` FOREIGN KEY (`idListing`) REFERENCES `Listings` (`id`)
);
