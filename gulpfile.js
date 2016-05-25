// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');

// Lint Task
gulp.task('lint', function() {
  return gulp
    .src([
      'app_server/*/*.js',
      'app_client/*/*.js',
      'app_client/*.js',
      'app_api/*/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Concatenate & Minify AngularJs Task
gulp.task('scripts', function() {
  return gulp
    .src([
      'app_client/*.js',
      'app_client/*/*.js'
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('public/javascripts'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts'));
});

// Watcher Task
gulp.task('watch', function() {
  gulp.watch(
    ['app_server/*/*.js',
    'app_client/*/*.js',
    'app_client/*.js',
    'app_api/*/*.js'
    ], ['lint', 'scripts']);
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
gulp.task('default', ['lint', 'scripts', 'watch', 'start']);
gulp.task('build', ['lint', 'scripts']);
