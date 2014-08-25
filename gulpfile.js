'use strict';

var gulp = require('gulp');
var del = require('del');
var plugins = require('gulp-load-plugins')();

gulp.task('js', ['clean'], function() {

	return gulp.src('./src/*.js')
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter(plugins.jshintStylish))
		.pipe(plugins.jshint.reporter('fail'))
		.pipe(plugins.stripDebug())
		.pipe(gulp.dest('./dist'))
		.pipe(plugins.uglify())
		.pipe(plugins.rename({extname: '.min.js'}))
		.pipe(gulp.dest('./dist'));

});

gulp.task('clean', function(cb) {

	del(['./dist/*'], cb);

});

gulp.task('watch', function() {

	gulp.watch('./src/*.js', ['build'], function(e) {

		plugins.util.log('Event type: ' + e.type);
		plugins.util.log('Event path: ' + e.path);

	});

});

gulp.task('build', ['js']);

gulp.task('default', ['build']);