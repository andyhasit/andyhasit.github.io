var gulp = require('gulp'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify');
  //watch = require('gulp-watch');

gulp.task('js', function(){
  return gulp.src(['src/*.js'])
    .pipe(concat('js2k.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .on('error', function (err) { console.log(err.toString()); })
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['js'], function(){});
gulp.task('watch', ['js'], function(){
    gulp.watch('src/**/*.js', ['js']);
});