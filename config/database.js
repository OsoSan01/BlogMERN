const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

//very if the connection with Mongo is correct
db.on('connected', function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});

//check if there is an error in the connection
db.on("error", (error) => {
  console.log('Error in MongoDB connection', error);
})

module.exports = db;