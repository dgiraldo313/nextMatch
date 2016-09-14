'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
 nodemon = require('gulp-nodemon');

gulp.task("hello", ()=>{
  console.log("Hello World!");
});

 //sass
gulp.task('sass', function () {
  return gulp.src('./public/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});


// sass watch
gulp.task('sass:watch', function () {
  gulp.watch('./public/sass/**/*.scss', ['sass']);
});


//start server
gulp.task('start', function () {
  nodemon({
    script: './bin/www'
  });
});

// runs when no arguments are passed in
gulp.task("default", ['sass','sass:watch', 'start'], ()=>{
  console.log("Default Task");
});
