const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const nodemailer = require('nodemailer');

// Route for user registration
router.post('/register', async (req, res) => {
    var mysql = require('mysql');
    // Create a new connection to the database using environment variables
    var conn = mysql.createConnection({
        host: process.env.VITE_DB_HOST, // Database host
        port: process.env.VITE_DB_PORT, // Database port
        user: process.env.VITE_DB_USER, // Database username
        password: process.env.VITE_DB_PASSWORD, // Database password
        database: process.env.VITE_DB_NAME // Database name
    });

    // Extract user details from the request body
    const { email, first_name, last_name, password, userType } = req.body;

    let approved;
    if (userType === 'Seller') {
        approved = false; //If userType is Seller, then approved = false by default
    } else {
        approved = true; //If userType is not Seller, then approved = true by default
    }

    try {
        // Generate a salt for hashing the password
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the password together with the salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // Open a connection to the database
        conn.connect(function(err) {
            if (err) throw err; // Handle connection errors
            // SQL query to insert the new user
            const sql = `INSERT INTO Users (email, first_name, last_name, password, salt, userType, approved) VALUES (?, ?, ?, ?, ?, ?, ?)`;

            // Execute the query with the provided user information
            conn.query(sql, [email, first_name, last_name, hashedPassword, salt, userType, approved], function(err, result) {
                if (err) {
                    // Log and respond with errors encountered during user insertion
                    console.error("Error inserting user:", err);
                    res.status(500).send('Error registering new user');
                } else {
                    // Confirm successful registration
                    res.status(201).send('User registered successfully');
                }
                // Close the connection after query execution
                conn.end();
            });
        });
    } catch (error) {
        // Catch and log errors during the password hashing process
        console.error("Hashing error:", error);
        res.status(500).send('Internal server error');
        // Close the connection after query execution
        conn.end();
    }
});

// Route for user login
router.post('/login', (req, res) => {
    // Require the mysql library for database interaction
    var mysql = require('mysql');
    // Establish a new connection to the database with environment variables
    var conn = mysql.createConnection({
        host: process.env.VITE_DB_HOST, // Database host
        port: process.env.VITE_DB_PORT, // Database port
        user: process.env.VITE_DB_USER, // Database user
        password: process.env.VITE_DB_PASSWORD, // Database password
        database: process.env.VITE_DB_NAME // Database name
    });

    // Extract the email and password from the request body
    const { email, password } = req.body;

    // Connect to the MySQL database
    conn.connect(function(err) {
        if (err) throw err; // If there's an error, throw the error
        // Prepare the SQL query to find the user by their email
        const sql = `SELECT * FROM Users WHERE email = ?`;

        // Execute the query with the provided email
        conn.query(sql, [email], async function(err, result) {
            if (err) {
                // If there's an error during the query execution, log it and send a 500 response
                console.error("Error finding user:", err);
                res.status(500).send('Internal server error');
            } else if (result.length > 0) {

                // If a user is found, proceed to verify the password
                const user = result[0];
                
                // Hash the provided password with the stored salt for the user
                const hashedInputPassword = await bcrypt.hash(password, user.salt);
                
                // Compare the hashed input password with the stored hashed password
                if (hashedInputPassword === user.password) {

                    // Check if the user is a seller and not approved yet
                    if (user.userType === 'Seller' && !user.approved) {
                        // Respond with "Seller Not Approved" if the user is a seller and not approved
                        return res.status(403).send('Seller Not Approved'); // Use 403 for Forbidden access
                    }

                    //Generate JWT 
                    const token = jwt.sign(
                        { id: user.id, email: user.email, userType: user.userType }, // Payload
                        process.env.VITE_JWT_SECRET, // Secret key
                        { expiresIn: 180 } // Token expiration (3 mins)
                    );

                    // If they match, authentication is successful, send JWT in response
                    res.status(200).json({
                        message: 'Login successful',
                        id: user.id, // Include the user's id in the response
                        userType: user.userType, // Include the userType in the response
                        token: token //Include token in response
                    });
                } else {
                    // If they don't match, the credentials are invalid
                    res.status(401).send('Invalid credentials'); // Use 401 for unauthorized/invalid login attempts
                }
            } else {
                // If no user is found with the provided email, send a 404 response
                res.status(404).send('User not found');
            }
            // Close the connection after query execution
            conn.end();
        });
    });
});

// Route to get all unapproved users (will just be realtors who registered)
router.get('/getAllUnapproved', (req, res) => {
    var mysql = require('mysql');
    // Establish a new connection to the database with environment variables
    var conn = mysql.createConnection({
        host: process.env.VITE_DB_HOST, // Database host
        port: process.env.VITE_DB_PORT, // Database port
        user: process.env.VITE_DB_USER, // Database user
        password: process.env.VITE_DB_PASSWORD, // Database password
        database: process.env.VITE_DB_NAME // Database name
    });

    // Connect to the MySQL database
    conn.connect(function(err) {
        if (err) {
            console.error("Connection error:", err);
            return res.status(500).send('Internal server error');
        }
        
        // Prepare the SQL query to find all users where approved is false
        const sql = `SELECT * FROM Users WHERE approved = false`;

        // Execute the query
        conn.query(sql, function(err, result) {
            if (err) {
                // If there's an error during the query execution, log it and send a 500 response
                console.error("Error querying unapproved users:", err);
                res.status(500).send('Error fetching unapproved users');
            } else {
                // If the query is successful, return the list of unapproved users
                res.status(200).json(result);
            }
        });
        // Close the connection after query execution
        conn.end();
    });
});

// Route to update a user's approval status or delete the user
router.post('/updateOrDeleteUser', (req, res) => {
    var mysql = require('mysql');
    var conn = mysql.createConnection({
        host: process.env.VITE_DB_HOST,
        port: process.env.VITE_DB_PORT,
        user: process.env.VITE_DB_USER,
        password: process.env.VITE_DB_PASSWORD,
        database: process.env.VITE_DB_NAME
    });

    const { id, action } = req.body; // Extract id and action from the request body

    // Connect to the MySQL database
    conn.connect(function(err) {
        if (err) {
            console.error("Connection error:", err);
            return res.status(500).send('Internal server error');
        }

        if (action === 'approve') {
            // SQL query to update the user's approved status to true
            const sql = `UPDATE Users SET approved = true WHERE id = ?`;

            conn.query(sql, [id], function(err, result) {
                if (err) {
                    console.error("Error updating user status:", err);
                    res.status(500).send('Error updating user status');
                } else {
                    res.status(200).send('User status updated successfully');
                }
                // Close the connection after query execution
                conn.end();
            });
        } else if (action === 'delete') {
            // SQL query to delete the user
            const sql = `DELETE FROM Users WHERE id = ?`;

            conn.query(sql, [id], function(err, result) {
                if (err) {
                    console.error("Error deleting user:", err);
                    res.status(500).send('Error deleting user');
                } else {
                    res.status(200).send('User deleted successfully');
                }
                // Close the connection after query execution
                conn.end();
            });
        } else {
            // Handle invalid action
            res.status(400).send('Invalid action');
            // Close the connection after query execution
            conn.end();
        }
    });
});

// Route to update a user's email
router.post('/updateEmail', async (req, res) => {
    const { id, newEmail } = req.body; // Extract user ID and new email from the request body

    var mysql = require('mysql');
    // Establish a new connection to the database with environment variables
    var conn = mysql.createConnection({
        host: process.env.VITE_DB_HOST, // Database host
        port: process.env.VITE_DB_PORT, // Database port
        user: process.env.VITE_DB_USER, // Database username
        password: process.env.VITE_DB_PASSWORD, // Database password
        database: process.env.VITE_DB_NAME // Database name
    });

    // Connect to the MySQL database
    conn.connect(err => {
        if (err) {
            console.error("Connection error:", err);
            return res.status(500).send('Internal server error');
        }

        // SQL query to update the user's email
        const sql = `UPDATE Users SET email = ? WHERE id = ?`;

        // Execute the query with the new email and user ID
        conn.query(sql, [newEmail, id], (err, result) => {
            if (err) {
                console.error("Error updating user's email:", err);
                return res.status(500).send('Error updating email');
            }
            res.status(200).send('Email updated successfully');
            // Close the connection after query execution
            conn.end();
        });
    });
});

// Route to update a user's password
router.post('/updatePassword', async (req, res) => {
    const { id, newPassword } = req.body; // Extract user ID and new password from the request body

    var mysql = require('mysql');
    // Establish a new connection to the database with environment variables
    var conn = mysql.createConnection({
        host: process.env.VITE_DB_HOST,
        port: process.env.VITE_DB_PORT,
        user: process.env.VITE_DB_USER,
        password: process.env.VITE_DB_PASSWORD,
        database: process.env.VITE_DB_NAME
    });

    try {
        // Generate a new salt and hash for the new password
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Connect and update the password in the database
        conn.connect(err => {
            if (err) {
                console.error("Connection error:", err);
                return res.status(500).send('Internal server error');
            }

            // SQL query to update the user's password and salt
            const sql = `UPDATE Users SET password = ?, salt = ? WHERE id = ?`;

            // Execute the update query
            conn.query(sql, [hashedPassword, salt, id], (err, result) => {
                if (err) {
                    console.error("Error updating user's password:", err);
                    return res.status(500).send('Error updating password');
                }
                res.status(200).send('Password updated successfully');
                // Close the connection after query execution
                conn.end();
            });
        });
    } catch (error) {
        console.error("Hashing error:", error);
        res.status(500).send('Internal server error');
    }
});

// Route to delete a user and their related data
router.post('/deleteUser', (req, res) => {
    const { id } = req.body; // Extract the user ID from the request body

    var mysql = require('mysql');
    // Establish a new connection to the database with environment variables
    var conn = mysql.createConnection({
        host: process.env.VITE_DB_HOST,
        port: process.env.VITE_DB_PORT,
        user: process.env.VITE_DB_USER,
        password: process.env.VITE_DB_PASSWORD,
        database: process.env.VITE_DB_NAME
    });

    conn.connect(err => {
        if (err) {
            console.error("Connection error:", err);
            return res.status(500).send('Internal server error');
        }

        // Start the transaction
        conn.beginTransaction(err => {
            if (err) {
                return conn.rollback(() => {
                    throw err;
                });
            }

            // Step 1: Delete all reports on the user's listings
            const deleteReportsOnListings = `DELETE Reports FROM Reports 
                                              INNER JOIN Listings ON Reports.idListing = Listings.id 
                                              WHERE Listings.idSeller = ?`;
            conn.query(deleteReportsOnListings, [id], (err, result) => {
                if (err) {
                    return conn.rollback(() => {
                        throw err;
                    });
                }

                // Step 2: Delete the user's listings
                const deleteListings = `DELETE FROM Listings WHERE idSeller = ?`;
                conn.query(deleteListings, [id], (err, result) => {
                    if (err) {
                        return conn.rollback(() => {
                            throw err;
                        });
                    }

                    // Step 3: Finally, delete the user itself
                    const deleteUser = `DELETE FROM Users WHERE id = ?`;
                    conn.query(deleteUser, [id], (err, result) => {
                        if (err) {
                            return conn.rollback(() => {
                                throw err;
                            });
                        }

                        // Commit the transaction if all steps are successful
                        conn.commit(err => {
                            if (err) {
                                return conn.rollback(() => {
                                    throw err;
                                });
                            }
                            res.status(200).send('User and related data deleted successfully');
                        });
                        // Close the connection after query execution
                        conn.end();
                    });
                });
            });
        });
    });
});

// Route to send a message to seller
router.post('/contactSeller', (req, res) => {
    // Extract necessary information from the request body
    const { listingId, buyerId, message } = req.body;

    // Dynamically configure the transporter inside the endpoint
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME, // Gmail Address
            pass: process.env.EMAIL_PASSWORD,  // Gmail Password
        },
    });

    var mysql = require('mysql');
    // Establish a new connection to the database with environment variables
    var conn = mysql.createConnection({
        host: process.env.VITE_DB_HOST,
        user: process.env.VITE_DB_USER,
        password: process.env.VITE_DB_PASSWORD,
        database: process.env.VITE_DB_NAME
    });

    conn.connect(err => {
        if (err) {
            console.error("Connection error:", err);
            conn.end();
            return res.status(500).send('Failed to connect to the database');
        }

        // First, fetch the buyer's email using the buyerId
        conn.query('SELECT email FROM Users WHERE id = ?', [buyerId], (err, buyerResults) => {
            if (err || buyerResults.length === 0) {
                console.error("Failed to find buyer:", err);
                conn.end();
                return res.status(500).send('Failed to find buyer');
            }

            const buyerEmail = buyerResults[0].email;

            // Next, fetch the seller's email by joining Listings and Users with the listingId
            const sellerEmailQuery = `
                SELECT Users.email AS sellerEmail
                FROM Listings
                INNER JOIN Users ON Listings.idSeller = Users.id
                WHERE Listings.id = ?
            `;

            conn.query(sellerEmailQuery, [listingId], (err, sellerResults) => {
                if (err || sellerResults.length === 0) {
                    console.error("Failed to find listing or seller:", err);
                    conn.end();
                    return res.status(500).send('Failed to find listing or seller');
                }

                const sellerEmail = sellerResults[0].sellerEmail;

                // Configure the mail options for sending the email
                const mailOptions = {
                    from: process.env.EMAIL_USERNAME, // Sender address
                    to: sellerEmail, // Receiver address
                    subject: `FirstHome | New message from potential buyer | ${buyerEmail}`, // Subject line
                    text: `Message from: ${buyerEmail}\n\n${message}`, // Body
                };

                // Send the email
                transporter.sendMail(mailOptions, (error, info) => {
                    conn.end();
                    if (error) {
                        console.error("Error sending email:", error);
                        conn.end();
                        return res.status(500).send('Failed to send email');
                    }
                    res.status(200).send('Message sent successfully to seller');
                });
            });
        });
    });
});

// Route to get a User's information
router.get('/getUserInfo', (req, res) => {
	// Get user's id from the request
    const query = req.query;
	
	var mysql = require('mysql');
	// Establish a new connection to the database with environment variables
	var conn = mysql.createConnection({
		host: process.env.VITE_DB_HOST,
		user: process.env.VITE_DB_USER,
		password: process.env.VITE_DB_PASSWORD,
		database: process.env.VITE_DB_NAME
	});
	
	//Create a connection
	conn.connect(err => {
		if (err) {
            console.error("Connection error:", err);
            conn.end();
            return res.status(500).send('Failed to connect to the database');
        }
		
		//Get All User Info
        conn.query("SELECT first_name, last_name, email FROM Users WHERE id = ?", [query.id], function (err, result, fields) {
			conn.end();
			if (err) throw err;

			res.json(result);
		});
	});
	
});

module.exports = router;