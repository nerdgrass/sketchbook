var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', ['html', 'sass', 'js' ]);

gulp.task('html', function () {
  return gulp.src('app/*.html')
      .pipe(gulp.dest('dist'))
});

gulp.task('js', function () {
  return gulp.src('app/js/*.js')
      .pipe(gulp.dest('dist/js'))
});

gulp.task('sass', function() {
  gulp.src('./app/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', ['html', 'sass', 'js'], function () {
    // Watch .html files
    gulp.watch('app/*.html', ['html']);
    // Watch .scss files
    gulp.watch('app/scss/*.scss', ['sass']);
    // Watch .js files
    gulp.watch('app/js/*.js', ['js']);    
});