'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('nodemon', function(){
	nodemon({
		script: 'app.js',
		nodeArgs: ['--harmony']
	}).on('restart');
})

// one-off browserify task which is handy when debugging
// node --harmony `which gulp` browserify
gulp.task('browserify', function() {
  const b = getBrowserifyInstance();
  b.transform(babelify, {presets: ["es2015", "react"]});
  return bundleBrowserify(b);
})

gulp.task('watchify', function(){
	var b = getBrowserifyInstance();
	var w = watchify(b);

	w.transform(babelify, {presets: ["es2015", "react"]});
	w.on('update', function(){
		console.log('updating bundle');
		bundleBrowserify(w);
	});
	bundleBrowserify(w);
});

var getBrowserifyInstance = function() {
	var b = browserify('assets/js/app.jsx', {
		debug: true,
		extensions: ['.jsx'],

		// watchify arguments
		cache: {},
		packageCache: {}
	});

	return b;
}

var bundleBrowserify = function(b){
	return b
		.bundle(function(err){
      if(err){
        console.log(err.message);
      } else {
        console.log('bundle done');
      }
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(rename('bundle.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
}

gulp.task('default', ['nodemon', 'watchify']);