var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps')
var terser = require('gulp-terser');
var watch = require('gulp-watch');
var run = require('gulp-run');
var rollup = require('gulp-better-rollup');
var gutil = require('gulp-util');
//var babel = require('rollup-plugin-babel');

function allowError(error){
  console.log(error.toString())
  this.emit('end')
}

gulp.task('pillbug', function() {
  return gulp.src(['../pillbug/src/**/*.js'])
    .pipe(concat('pillbug.js'))
    .pipe(terser())  // If it fails, run `npx terser pillbug/src/pillbug.js`
    //.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .on('error', allowError)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('../pillbug/dist'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('../pillbug/dist'))
});

gulp.task('ratherdry', function() {
  return gulp.src(['../ratherdry/src/**/*.js'])
    .pipe(concat('ratherdry.js'))
    .pipe(terser())
    .on('error', allowError)
    .pipe(gulp.dest('../ratherdry/dist'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('../ratherdry/dist'))
});

gulp.task('pointy-handicap', ['pillbug', 'ratherdry'], function() {
  gulp.src('src/index.js')
    .pipe(sourcemaps.init())
    .pipe(rollup({
      // Rollups `sourcemap` option is unsupported. Use `gulp-sourcemaps` plugin instead
      format: 'iife',
    }).on('error', allowError))
    .on('error', allowError)
    // inlining the sourcemap into the exported .js file
    .pipe(sourcemaps.write())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('dist'))
});

gulp.task('pointy-handicap-min', function() {
  gulp.src('dist/bundle.js')
    //.pipe(sourcemaps.init())
    .pipe(terser())  // If it fails, run `npx terser dist/bundle.js`
    .on('error', allowError)
    // inlining the sourcemap into the exported .js file
    //.pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'))
    //.pipe(run('gzip dist/bundle.min.js -fk && ls -lh dist').exec());
});

all = [
  'pillbug', 
  'pointy-handicap',
  'ratherdry'
  ]

gulp.task('default', all, function(){});

// task "pointy-handicap" requires the other two
gulp.task('watch-demo', all, function() {
  gulp.watch('pillbug/src/**/*.js', ['pointy-handicap']);
  gulp.watch('ratherdry/src/**/*.js', ['pointy-handicap']);
  gulp.watch('src/**/*.js', ['pointy-handicap']);
});

gulp.task('watch-libs', all, function(){
  gulp.watch('pillbug/src/**/*.js', ['pillbug']);
  gulp.watch('ratherdry/src/**/*.js', ['ratherdry']);
  gulp.watch('src/**/*.js', ['pointy-handicap']);
});