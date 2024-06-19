const mongoose = require('mongoose');

// define the mongodb connection URL
const mongoURL = 'mongodb://localhost:27017/hotels' // replace "mydb" with your db name

// set up Mongodb connection
mongoose.connect(mongoURL, {
    useNewUrlParser : true,
    useUnifiedTopology: true
})

// get the default connection
// Mongoose maintain a default connection object representing the mongodb connection
const db = mongoose.connection;

// Define event listeners for db connection

db.on('connected', () => {
    console.log('Connected to Mongodb server');
})

db.on('error', () => {
    console.log('Mongodb connection error:', err);
})

db.on('disconnected', () => {
    console.log('Mongodb disconnected');
});

// export the db connection
module.exports = db;
