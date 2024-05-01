const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION
});
const s3 = new AWS.S3();

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Route for getting all posted/active listings. Requires type ("Sale" or "Rent")
router.get('/getAllListings', (req, res) => {
	var mysql = require('mysql');
	
	var query = req.query;
	
	var conn = mysql.createConnection({
		host: process.env.VITE_DB_HOST,
		port: process.env.VITE_DB_PORT,
		user: process.env.VITE_DB_USER,
		password: process.env.VITE_DB_PASSWORD,
		database: process.env.VITE_DB_NAME
	});
	
	conn.connect(function(err) {
		if(err) throw err;
		
		if(query.type == "Sale"){
			conn.query("SELECT * FROM Listings WHERE type = 'Sale' AND status = 'Posted'", function (err, result, fields) {
				conn.end();
				if (err) throw err;

				res.json(result);
			});
		}
		
		else if(query.type == "Rent"){
			conn.query("SELECT * FROM Listings WHERE type = 'Rent' AND status = 'Posted'", function (err, result, fields) {
				conn.end();
				if (err) throw err;
				
				res.json(result);
			});
		}
	});
});

//Route for custom searches. Requires the following in the body of the request: propertyType, searchType, minPrice, maxPrice, minFootage, maxFootage, bath, bed, and searchTerm.
//For rent property searches, along with the above terms, the following terms are also required: leaseDuration, utilities, and dateAvailable (in the yyyy-mm-dd format).
router.post('/searchListings', (req, res) => {
	var mysql = require('mysql');
	
	const body = req.body;
	
	var conn = mysql.createConnection({
		host: process.env.VITE_DB_HOST,
		port: process.env.VITE_DB_PORT,
		user: process.env.VITE_DB_USER,
		password: process.env.VITE_DB_PASSWORD,
		database: process.env.VITE_DB_NAME
	});
	
	conn.connect(function(err) {
		if(err) throw err;
		
		//Return all For Sale properties
		if(body.searchType == "Sale"){
			const sql_query = "SELECT * FROM Listings WHERE propertyType = ? AND type = ? AND price >= ? AND price <= ? AND squareFootage >= ? AND squareFootage <= ? AND bath = ? AND bed = ? AND status = 'Posted' AND LOWER(address) LIKE ?";
			conn.query(sql_query, [body.propertyType, body.searchType, body.minPrice, body.maxPrice, body.minFootage, body.maxFootage, body.bath, body.bed, "%" + body.searchTerm + "%"], function(err, result, fields) {
				conn.end();
				if(err) throw err;
				
				res.json(result);
			});
		}
		
		//Return all For Rent properties
		else{
			const sql_query = "SELECT * FROM Listings WHERE propertyType = ? AND type = ? AND leaseDuration >= ? AND utilities = ? AND dateAvailable >= ? AND price >= ? AND price <= ? AND squareFootage >= ? AND squareFootage <= ? AND bath = ? AND bed = ? AND status = 'Posted' AND LOWER(address) LIKE ?";
			conn.query(sql_query, [body.propertyType, body.searchType, body.leaseDuration, body.utilities, body.dateAvailable, body.minPrice, body.maxPrice, body.minFootage, body.maxFootage, body.bath, body.bed, "%" + body.searchTerm + "%"], function(err, result, fields) {
				conn.end();
				if(err) throw err;
				
				res.json(result);
			});
		}
		
	});
});

//Route for getting a Listing by its ID (when a user clicks on a listing). Requires listing id and listing status as query parameters.
router.get('/getListingbyID', (req, res) =>{
	var mysql = require('mysql');
	
	const query = req.query;
	
	var conn = mysql.createConnection({
		host: process.env.VITE_DB_HOST,
		port: process.env.VITE_DB_PORT,
		user: process.env.VITE_DB_USER,
		password: process.env.VITE_DB_PASSWORD,
		database: process.env.VITE_DB_NAME
	});
	
	//Return the listing with the specified id.
	conn.connect(function(err) {
		if (err) throw err;
		
		if(query.status == "Posted"){
			const sql_query = "SELECT * FROM Listings WHERE id=?";
			conn.query(sql_query, [query.id], function(err, result, fields) {
				conn.end();
				if(err) throw err;
				
				res.json(result);
			});
		}
		
		else{
			const sql_query = "SELECT * FROM Listings CROSS JOIN Reports ON Listings.id = Reports.idListing AND id = ?";
			conn.query(sql_query, [query.id], function(err, result, fields) {
				conn.end();
				if(err) throw err;
				
				res.json(result);
			});
		}
	});
});


//Route for getting all Listings by a sellerID (when a user wants to view their properties). Requires sellerID (userID).
router.get('/getListingbySeller', (req, res) =>{
	var mysql = require('mysql');
	
	const query = req.query;
	
	var conn = mysql.createConnection({
		host: process.env.VITE_DB_HOST,
		port: process.env.VITE_DB_PORT,
		user: process.env.VITE_DB_USER,
		password: process.env.VITE_DB_PASSWORD,
		database: process.env.VITE_DB_NAME
	});
	
	//Return all listings by a seller.
	conn.connect(function(err) {
		if (err) throw err;
		
		const sql_query = "SELECT * FROM Listings LEFT JOIN Reports ON Listings.id = Reports.idListing WHERE Listings.idSeller = ?";
		conn.query(sql_query, [query.sellerID], function(err, result, fields) {
			conn.end();
			if(err) throw err;
			
			res.json(result);
		});
	});
});

//Function to upload image to lightsail bucket. Used in post a listing and update a listing
function uploadImageToLightsail(fileBuffer, fileName) {
	const params = {
	  Bucket: 'bucket-firsthome',
	  Key: fileName,
	  Body: fileBuffer,
	  ContentType: 'image/jpeg',
	  ACL: 'public-read', // if you want the image to be publicly accessible
	};
  
	return new Promise((resolve, reject) => {
	  s3.upload(params, function(err, data) {
		if (err) {
		  reject(err);
		} else {
		  resolve(data.Location); // The URL of the uploaded image
		}
	  });
	});
}  

//Post a new listing based on seller ID
router.post('/postAListing', (req, res) => {
    var mysql = require('mysql');

    const body = req.body;
	// Prepare the SQL query with placeholders for the dynamic parts
	let sqlQuery = "INSERT INTO Listings (idSeller, type, propertyType, price, address, bath, bed, squareFootage, leaseDuration, utilities, dateAvailable, status, propertyDescription, images) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

	// Prepare values for the SQL query, including both the form data and image URLs
	let queryValues = [
		body.sellerID, body.searchType, body.propertyType, body.price, body.address, body.bath, body.bed, body.squareFootage, body.leaseDuration, body.utilities, body.dateAvailable, "Posted", body.propertyDescription, body.images
	];

	// Connect to the database and execute the query
	var conn = mysql.createConnection({
		host: process.env.VITE_DB_HOST,
		port: process.env.VITE_DB_PORT,
		user: process.env.VITE_DB_USER,
		password: process.env.VITE_DB_PASSWORD,
		database: process.env.VITE_DB_NAME
	});

	conn.connect(function(err) {
		if (err) throw err;

		conn.query(sqlQuery, queryValues, function(err, result, fields) {
			conn.end();
			if (err) throw err;
			res.sendStatus(201); // Send HTTP status 201 (Created) if successful
		});
	});
});

//upload images to lightsail bucket and get url back. Requires a file to be sent. Returns a url
router.post('/uploadToBucket', upload.single('image'), async (req, res) => {
    try {
        // Access the uploaded file directly
        const file = req.file;
        if (!file) {
            return res.status(400).send({ success: false, message: 'No image uploaded.' });
        }

        const fileBuffer = file.buffer;
        const fileName = file.originalname;

        // Upload the image and collect its URL
        const imageUrl = await uploadImageToLightsail(fileBuffer, fileName);

        // Respond with the URL of the uploaded image
        res.json({ success: true, imageUrl });
    } catch (error) {
        console.error('Error uploading image:', error); // Logging the error could be helpful for debugging
        res.status(500).send({ success: false, message: error.message });
    }
});


router.put('/updateAListing', (req, res) => {	
    var mysql = require('mysql');
    const body = req.body; 

	 // SQL query to update the listing, including all image URLs
	 let sqlQuery = "UPDATE Listings SET propertyType = ?, price = ?, address = ?, bath = ?, bed = ?, squareFootage = ?, leaseDuration = ?, utilities = ?, dateAvailable = ?, status = ?, propertyDescription = ?, images = ? WHERE id = ?";

	 // Values to be inserted into the query, including both form data and image URLs
	 let queryValues = [
		 body.propertyType, body.price, body.address, body.bath, body.bed, body.squareFootage, body.leaseDuration, body.utilities, body.dateAvailable, body.status, body.propertyDescription, body.images, body.id
	 ];

	 // Connect to your database
	 var conn = mysql.createConnection({
		 host: process.env.VITE_DB_HOST,
		 port: process.env.VITE_DB_PORT,
		 user: process.env.VITE_DB_USER,
		 password: process.env.VITE_DB_PASSWORD,
		 database: process.env.VITE_DB_NAME
	 });

	 conn.connect(function(err) {
		 if (err) throw err;

		 // Execute the SQL query
		 conn.query(sqlQuery, queryValues, function(err, result) {
			conn.end(); 
			if (err) throw err;
			res.sendStatus(200); // Success response			 
		 });
	 });
});

// Delete all images. Requires a Listing's ID
router.put('/deleteImages', (req, res) => {
	var mysql = require('mysql');
	
	const body = req.body;

	var conn = mysql.createConnection({
		host: process.env.VITE_DB_HOST,
		port: process.env.VITE_DB_PORT,
		user: process.env.VITE_DB_USER,
		password: process.env.VITE_DB_PASSWORD,
		database: process.env.VITE_DB_NAME
	});
	
	//update images to null and since image1 is mandatory field, use a placeholder text
	conn.connect(function(err) {
		if (err) throw err;
		const sql_query = "UPDATE Listings SET images = 'empty' WHERE id=?";
		conn.query(sql_query, [body.id], function(err, result) {
			conn.end();
			if(err) throw err;
			//Check if no. of rows changed were more than 0 or not
			if (result.affectedRows > 0) {
				res.sendStatus(200);
			} else {
				res.status(404).send('Listing not found.');
			}
			
		});
		
	});
});

//Delete a Listing from the database. Requires a Listing's ID.
router.delete('/deleteAListing', (req, res) => {
	var mysql = require('mysql');
	
	const query = req.query;
	
	var conn = mysql.createConnection({
		host: process.env.VITE_DB_HOST,
		port: process.env.VITE_DB_PORT,
		user: process.env.VITE_DB_USER,
		password: process.env.VITE_DB_PASSWORD,
		database: process.env.VITE_DB_NAME
	});
	
	//Delete a listing from the database
	conn.connect(function(err) {
		if (err) throw err;

		conn.query("DELETE FROM Reports WHERE idListing = ?", [query.id], function(err, result, fields) {
			if(err) throw err;
			
			const sql_query = "DELETE FROM Listings WHERE id = ?";
			conn.query(sql_query, [query.id], function(err, result, fields) {
				conn.end();
				if (err) throw err;
				
				res.sendStatus(200);
			});
		});
	});
});

module.exports = router;