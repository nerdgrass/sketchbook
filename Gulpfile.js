var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass');

// Primary run task
gulp.task('default', [], function() {
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
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
  gulp.src(['app/scripts/app.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  // Bundle to a single file
  .pipe(concat('bundle.js'))
  // Output it to our dist folder
  .pipe(gulp.dest('dist/scripts'));
});

// JSHint task
gulp.task('lint', function() {
  gulp.src('./app/scripts/*.js')
  .pipe(jshint())
  // You can look into pretty reporters as well, but that's another story
  .pipe(jshint.reporter('default'));
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