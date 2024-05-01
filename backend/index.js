//Import Express`
const express = require("express");
const app = express();
var cors = require('cors');
require('dotenv').config()

//Test server on main page
app.get('/', (req, res) => {
	res.send('<h1>Hello</h1>');
});

const userRoute = require('./routes/users');
const listingRoute = require('./routes/listings');
const reportsRoute = require('./routes/reports');

app.use(cors());
app.use(express.json());
app.use('/users', userRoute);
app.use('/listings', listingRoute);
app.use('/reports', reportsRoute);

//Specify port
const port = process.env.PORT || 3000;

//Have the server listen on this port
app.listen(port, () => {
});