'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('nodemon', function(){
	nodemon({
		script: 'app.js',
		nodeArgs: ['--harmony']
	}).on('restart');
})

gulp.task('default', ['nodemon']);