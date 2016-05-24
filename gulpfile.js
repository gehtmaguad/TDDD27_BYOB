// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('app_server/*/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Nodemon Task
gulp.task('start', function() {
  nodemon({
    env: { 
      'NODE_ENV': 'production',
      'MONGODB_URI': 'mongodb://heroku_49dmvtk4:h5u702lhm1dcfq5bgb7eno7vko@ds011331.mlab.com:11331/heroku_49dmvtk4',
      'API_KEY': 'AIzaSyCUy8YzvCFHzc8SMvykFhP6WGcMJLZwR-k'
      }
  })
})

// Default Task
gulp.task('default', ['lint','start']);
