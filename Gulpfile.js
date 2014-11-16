var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass');

// Livereload crap
var embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 5000;
// Set up an express server (but not starting it yet)
var server = express();
// Add live reload
server.use(livereload({port: livereloadport}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/*', function(req, res) {
    res.sendfile('index.html', { root: 'dist' });
});

// Primary run task
gulp.task('default', [], function() {
  // Start webserver
  server.listen(serverport);
  // Start live reload
  lrserver.listen(livereloadport);
  // Run the watch task, to keep taps on changes
  gulp.start('watch');
});

// Watch task
gulp.task('watch', ['lint'], function(){
  // Watch scripts
  gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'],[
    'lint',
    'browserify'
  ]);
  // Watch styles
  gulp.watch(['app/styles/app.scss','app/styles/**/*.scss'], [
    'styles'
  ]);
  // Watch markup
  gulp.watch(['app/index.html', 'app/views/**/*.html'], [
    'html'
  ]);
  // Watch images
  gulp.watch(['app/images/*'], [
    'images'
  ]);
});

// Browserify task
gulp.task('browserify', function() {
  gulp.src(['app/scripts/app.js'])//                Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)

  .pipe(browserify({//                              Browserify wizardry
    insertGlobals: true,
    debug: true
  }))
  
  .pipe(concat('app.js'))//                      Bundle to a single file
  .pipe(gulp.dest('dist/scripts'));
});

// JSHint task
gulp.task('lint', function() {
  gulp.src('./app/scripts/*.js')
  .pipe(jshint())
  // You can look into pretty reporters as well, but that's another story
  .pipe(jshint.reporter('default'));
});

// Styles task
gulp.task('styles', function() {
  gulp.src('app/styles/app.scss')
    .pipe(sass({
      sourcemap: true,
      sourcemapPath: '../scss'
    }))
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(gulp.dest('dist/styles'))
});

// HTML tasks
gulp.task('html', function() {
  gulp.start('views', 'index');
});
gulp.task('views', function() {
  return gulp.src('./app/views/*.html')//            Copy /views
    .pipe(gulp.dest('dist/views/'))
});
gulp.task('index', function () {
  return gulp.src('app/index.html')//                Copy index.html
    .pipe(gulp.dest('dist/'))
});

// Images task
gulp.task('images', function() {
  return gulp.src('./app/images/*')
    .pipe(gulp.dest('dist/images'))
});