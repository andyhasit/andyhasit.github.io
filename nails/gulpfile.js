var gulp = require('gulp'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglifyes');
  watch = require('gulp-watch');

gulp.task('concat_src', function(){
  return gulp.src(['src/*.js'])
    .pipe(concat('mop.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .on('error', function (err) { console.log(err.toString()); })
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
});


gulp.task('concat_demo', function(){
  return gulp.src(['demo/src/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('demo/dist'))
    .pipe(uglify())
    .on('error', function (err) { console.log(err.toString()); })
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('demo/dist'));
});

all = ['concat_src', 'concat_demo']
gulp.task('default', all, function(){});
gulp.task('watch', all, function(){
    gulp.watch('src/**/*.js', ['concat_src']);
    gulp.watch('demo/src/**/*.js', ['concat_demo']);
});