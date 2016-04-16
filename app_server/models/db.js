// Require mongoose
var mongoose = require( 'mongoose' );

// Connect to mongodb database via mongoose
var dbUrl = 'mongodb://localhost/BYOB';
mongoose.connect(dbUrl);

// Log connetion status
mongoose.connection.on('connected', function() {
  console.log('Database connection established to ' + dbUrl)
});
mongoose.connection.on('error', function() {
  console.log('Error on database connection to ' + dbUrl)
});
mongoose.connection.on('disconnected', function() {
  console.log('Database connection ended to ' + dbUrl)
});

// Shutdown function
shutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Database connection shutdown through ' + msg);
    callback();
  });
};

// Listen to Unix signals and close database connection
// when the nodejs application is shutdown or restarted
process.once('SIGUSR2', function() {
  shutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', function() {
  shutdown('application termination', function() {
    process.exit(0);
  });
});

process.on('SIGTERM', function() {
  shutdown('application termination', function() {
    process.exit(0);
  });
});
