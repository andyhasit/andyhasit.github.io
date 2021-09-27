var gulp = require('gulp'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglifyes');

function swallowError (error) {
  console.log(error.toString())
  this.emit('end')
}

gulp.task('minify', function(){
  return gulp.src(['src/*.js'])
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .on('error', swallowError)
    .pipe(rename({ suffix: '.min' })) 
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['minify'], function(){});
