USE firstHomeSchema;

-- Seeding Users
INSERT INTO `Users` (`email`, `first_name`, `last_name`, `password`, `salt`, `userType`, `approved`) VALUES
('johndoe@example.com', 'John', 'Doe', '42ecc7f9bb7e9e77643ce55b1768d1ba7bafde48e088857769dbbe59e44', 'random_salt1', 'Seller', True),
('janedoe@example.com', 'Jane', 'Doe', 'a4d36787600aeaa9c32b9c53d8105e9a89697925760c7f88728ae8fcfa0', 'random_salt2', 'Seller', True),
('mikebrown@example.com', 'Mike', 'Brown', '797bbce2399d95a3cd28ec0ea28192989b94caeb631969f99f8c5b1a040', 'random_salt3', 'Seller', True),
('sarahconnor@example.com', 'Sarah', 'Connor', 'f0be28b80025eb1f388de6da1648e363dd9075769d594c59abe73250d50', 'random_salt4', 'Buyer', True),
('kylereece@example.com', 'Kyle', 'Reece', 'dca8bb78e5a70b3863a31185ab70dbfcd09344d1ba76061ece5b5872c65', 'random_salt5', 'Buyer', True),
('jimbob@example.com', 'Jim', 'Bob', '269257d81cb562e0839ea544403803abc3fe90394e4d2fd65dd41181a9a', 'random_salt6', 'Seller', False),
('bingbong@example.com', 'Bing', 'Bong', '$2b$10$fuyHvHxIfqLMh6JBwh.E1.NdI/6Wni0jl./9jkz41kWflaWIGch7S', '$2b$10$fuyHvHxIfqLMh6JBwh.E1.', 'Admin', True);

-- Seeding Listings
INSERT INTO `Listings` (`idSeller`, `type`, `propertyType`, `price`, `address`, `bath`, `bed`, `squareFootage`, `leaseDuration`, `utilities`, `dateAvailable`, `status`, `propertyDescription`, `images`) VALUES
(1, 'Rent', 'Apartment', 1200, '123 Main St, Vancouver, BC', 1, 2, 800, 12, 'Water, Heat', '2024-04-01', 'Posted', 'Cozy downtown apartment with great views.', 'https://placehold.co/600x400?text=id:1 imagenumber:1'),
(3, 'Sale', 'House', 850000, '456 Maple Ave, Toronto, ON', 2, 3, 1500, NULL, NULL, NULL, 'Posted', 'Beautiful family home in a friendly neighborhood.', 'https://placehold.co/600x400?text=id:2 imagenumber:1'),
(2, 'Rent', 'Townhouse', 2000, '789 Birch Rd, Montreal, QC', 2, 4, 1200, 24, 'Electricity, Water, Internet', '2024-05-15', 'Posted', 'Spacious townhouse in a convenient location.', 'https://placehold.co/600x400?text=id:3 imagenumber:1'),
(3, 'Sale', 'House', 1500000, '123 Chocolate Ave, Calgary, AB', 2, 4, 2500, NULL, NULL, NULL, 'In Review', 'Beautiful mansion in a friendly neighborhood.', 'https://placehold.co/600x400?text=id:4 imagenumber:1'),
(1, 'Sale', 'Condo', 400000, '248 Carriage St. Baker Brook, New Brunswick', 1, 2, 1500, NULL, NULL, NULL, 'Taken Down', 'Beautiful mansion in a friendly neighborhood.', 'https://placehold.co/600x400?text=id:4 imagenumber:1'),
(2, 'Sale', 'Duplex', 925000, '58 Green Ave. Midland, Ontario', 2, 2, 2000, NULL, NULL, NULL, 'Posted', 'Luxury Duplex in Ontario', 'https://placehold.co/600x400?text=id:4 imagenumber:1'),
(3, 'Rent', 'Apartment', 2500, '958 William Drive Chatham, Quebec', 1, 2, 500, 12, 'Electricity', '2024-05-01', 'Posted', '500 sq. ft. Apartment in Quebec', 'https://placehold.co/600x400?text=id:4 imagenumber:1'),
(2, 'Rent', 'Townhouse', 3500, '8937 Sulphur Springs Ave. Petawawa, Ontario', 2, 3, 1200, 12, 'All Included', '2024-06-01', 'Posted', 'Big Townhouse in Ontario', 'https://placehold.co/600x400?text=id:4 imagenumber:1'),
(1, 'Sale', 'Duplex', 1250000, '7495 Old West Dr. Sainte-Rose, Quebec', 2, 3, 2000, NULL, NULL, NULL, 'Posted', '$1.25 Million Dollar Duplex in Quebec', 'https://placehold.co/600x400?text=id:4 imagenumber:1'),
(3, 'Sale', 'Condo', 500000, '864 Glenlake Drive Penticton, British Columbia', 2, 3, 1700, NULL, NULL, NULL, 'Posted', '3 Bed 2 Bath Condo in British Columbia', 'https://placehold.co/600x400?text=id:4 imagenumber:1'),
(2, 'Sale', 'House', 800000, '66 Peachtree Street Meaford, Ontario', 2, 3, 2100, NULL, NULL, NULL, 'Posted', 'For Sale House', 'https://placehold.co/600x400?text=id:4 imagenumber:1'),
(3, 'Sale', 'House', 850000, '62 Snake Hill Street Estevan, Saskatchewan', 2, 2, 1900, NULL, NULL, NULL, 'Posted', '1900 sq. ft. House in Saskatchewan', 'https://placehold.co/600x400?text=id:4 imagenumber:1'),
(1, 'Rent', 'Apartment', 2300, '7 Fairfield St. Okotoks, Alberta', 1, 2, 450, 24, 'Water, Heat', '2024-05-20', 'Posted', 'Nice Apartment in Okotoks Alberta', 'https://placehold.co/600x400?text=id:4 imagenumber:1'),
(1, 'Rent', 'Townhouse', 2200, '9488 Fairground Drive Bonnyville, Alberta', 2, 2, 550, 12, 'All Included', '2024-06-10', 'Posted', 'A Townhouse in Alberta', 'https://placehold.co/600x400?text=id:4 imagenumber:1'),
(3, 'Sale', 'Condo', 600000, '392 Fairfield St. Riding Mountain, Manitoba', 2, 2, 1700, NULL, NULL, NULL, 'Posted', 'A nice Condo in Manitoba', 'https://placehold.co/600x400?text=id:4 imagenumber:1');

-- Seeding Reports
INSERT INTO `Reports` (`idListing`, `reportReason`, `dateReported`, `userID`, `reportCount`) VALUES
(1, 'Incorrect information', '2024-03-17', '2', 1),
(3, 'Incorrect information, Fake listing', '2024-03-18', '4, 5', 2),
(4, 'Incorrect information, Fake listing, Fake listing, Fake listing, Incorrect information', '2024-03-18', '1, 3, 4, 5, 2', 5),
(5, 'Incorrect Square Footage, Fake listing, Incorrect Number of Bedrooms, Fake listing, Incorrect Description', '2024-03-18', '1, 2, 4, 3, 5', 5);