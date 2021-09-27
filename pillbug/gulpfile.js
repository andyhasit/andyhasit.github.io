var gulp = require('gulp'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglifyes'),
  watch = require('gulp-watch'),
  run = require('gulp-run');

function swallowError (error) {
  console.log(error.toString())
  this.emit('end')
}

gulp.task('concat_src', function(){
  return gulp.src(['src/*.js'])
    .pipe(concat('pillbug.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .on('error', swallowError)
    .pipe(rename({ suffix: '.min' })) 
    .pipe(gulp.dest('dist'))
    .pipe(run('gzip dist/pillbug.min.js -fk && ls -lh dist').exec());
});


gulp.task('concat_demo', function(){
  /*
  return gulp.src(['demo/src/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('demo/dist'))
    .pipe(uglify())
    .on('error', swallowError)
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('demo/dist'));
  */
  return run('npx webpack --entry ./demo/src/index.js --output ./demo/dist/bundle.js').exec()
  ;
});

all = ['concat_src', 'concat_demo']
gulp.task('default', all, function(){});
gulp.task('watch', all, function(){
    gulp.watch('src/**/*.js', ['concat_src']);
    gulp.watch('demo/src/**/*.js', ['concat_demo']);
});