const express = require('express');
const router = express.Router();

//Route for getting all Reports. Does not require anything in the body.
router.get('/getAllReports', (req, res) => {
	var mysql = require('mysql');
	
	var conn = mysql.createConnection({
		host: process.env.VITE_DB_HOST,
		port: process.env.VITE_DB_PORT,
		user: process.env.VITE_DB_USER,
		password: process.env.VITE_DB_PASSWORD,
		database: process.env.VITE_DB_NAME
	});
	
	conn.connect(function(err) {
		if(err) throw err;
		
		conn.query("SELECT idReport,idListing,reportReason,dateReported,userID,reportCount FROM Reports, Listings WHERE Reports.reportCount > 4 AND Reports.idListing = Listings.id AND Listings.status = 'In Review'", function(err, result, fields) {
			if(err) throw err;
			
			res.json(result);
		});
	});
});

//Route for posting a report. Requires the ID of the listing being reported, the reason for the report, the date it was reported, and the user ID of the person that owns the property.
//If a Report for a Listing already exists, then the new report reason is added to the previous report reasons already in the database (as long as is wasn't already reported for the same reason).
router.post('/postAReport', (req, res) => {
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
		
		sql_query = "INSERT INTO Reports (idListing, reportReason, dateReported, userID, reportCount) VALUES (?, ?, ?, ?, 1) ON DUPLICATE KEY UPDATE dateReported = ?, reportReason = IF(reportReason NOT LIKE ?, CONCAT(reportReason, ?), reportReason), userID = CONCAT(userID, ?), reportCount = reportCount + 1"
		conn.query(sql_query, [body.idListing, body.reportReason, body.dateReported, body.userID, body.dateReported, "%" + body.reportReason + "%", ", " + body.reportReason, ", " + body.userID], function(err, result, fields) {
			if(err) throw err;
			
			conn.query("SELECT reportCount FROM Reports WHERE idListing = ?", [body.idListing], function(err, result, fields) {
				if(err) throw err;
				
				if(result[0].reportCount > 4){
					conn.query("UPDATE Listings SET status = ? WHERE id = ?", ["In Review", body.idListing], function(err, result, fields) {
						if(err) throw err;
						
						res.sendStatus(201);
					});
				}
				else{
					res.sendStatus(201);
				}
			});
		});
	});
});

//Route for getting a reported listing. Requires the listing's id.
router.get('/getAReportedListing', (req, res) => {
	var mysql = require('mysql');
	
	const query = req.query;
	
	var conn = mysql.createConnection({
		host: process.env.VITE_DB_HOST,
		port: process.env.VITE_DB_PORT,
		user: process.env.VITE_DB_USER,
		password: process.env.VITE_DB_PASSWORD,
		database: process.env.VITE_DB_NAME
	});
	
	conn.connect(function(err) {
		if(err) throw err;
		
		sql_query = "SELECT * FROM Listings CROSS JOIN Reports ON Listings.id = Reports.idListing AND id = ?"
		conn.query(sql_query, [query.id], function(err, result, fields) {
			if(err) throw err;
			
			res.json(result);
		});
	});
});


//Update the status of a Listing. Requires the status to be updated to (re-instate, in-review, take-down) and the ID of the Listing.
router.put('/updatePostingStatus', (req, res) => {
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
		
		if(body.status == "Re-Instate"){
			sql_query = "DELETE FROM Reports WHERE idListing = ?"
			conn.query(sql_query, [body.id], function(err, result, fields) {
				if(err) throw err;
				
				conn.query("UPDATE Listings SET status = ? WHERE id = ?", ["Posted", body.id], function(err, result, field) {
					if(err) throw err;
					
					res.sendStatus(200)
				});
			});	
		}
		
		else if(body.status == "In Review"){
			conn.query("UPDATE Listings SET status = ? WHERE id = ?", ["In Review", body.id], function(err, result, field) {
				if(err) throw err;
				
				res.sendStatus(200)
			});
		}
		
		else if(body.status == "Taken Down"){
			conn.query("UPDATE Listings SET status = ? WHERE id = ?", ["Taken Down", body.id], function(err, result, field) {
				if(err) throw err;
				
				res.sendStatus(200)
			});
		}
	});
});



module.exports = router;