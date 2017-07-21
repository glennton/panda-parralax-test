'use strict';
const gulp = require('gulp');
const jade = require('gulp-jade');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const concat = require('gulp-concat')
const merge = require('merge-stream')
const livereload = require('gulp-livereload');

const src = './public/src/';
const dist = './public/dist/';

//JADE
let jadeFolder = ['', 'views/'];
gulp.task('jade', () => {
  let tasks = jadeFolder.map(function(element){
    return gulp.src(src + element + '*.jade')
      .pipe(jade())
      .pipe(gulp.dest(dist + element));
  });
  return merge(tasks);
});

//SASS
gulp.task('sass', () => {
  return gulp
    .src(src + '/styles/*.sass')
    .pipe(sass()
      .on('error', sass.logError))
    .pipe(gulp.dest(dist + '/styles'))
    .pipe(livereload());
});








///////////////// Main Commands /////////////////

//Default Command
gulp.task('default',[],()=>{

})
//Develop Command
gulp.task('develop', ['jade', 'sass'],()=>{
  livereload.listen({quiet:true});
    gulp.watch([src + '*.jade', src + 'views/*.jade'], ['jade'])
    gulp.watch(src + 'styles/*.sass',['sass'])
})
