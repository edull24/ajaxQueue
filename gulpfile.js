'use strict';

var gulp = require('gulp');
var del = require('del');
var pkg = require('./package.json');
var plugins = require('gulp-load-plugins')();

var banner = [
	'/*!',
	' * <%= pkg.name %> - <%= pkg.description %>',
	' * v<%= pkg.version %> ' + (new Date().toDateString()),
	' * <%= pkg.homepage %>',
	' *',
	' * Copyright 2014, ' + (new Date().getFullYear()) + ' Evan Dull',
	' * Released under the <%= pkg.license %> License',
	' */',
	''
].join('\n');

gulp.task('js', ['clean'], function() {

	return gulp.src('./src/*.js')
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter(plugins.jshintStylish))
		.pipe(plugins.jshint.reporter('fail'))
		.pipe(plugins.stripDebug())
		.pipe(gulp.dest('./dist'))
		.pipe(plugins.uglify({
			preserveComments: 'some'
		}))
		.pipe(plugins.rename({extname: '.min.js'}))
		.pipe(plugins.header(banner, {pkg: pkg}))
		.pipe(gulp.dest('./dist'));

});

gulp.task('size', ['build'], function() {

	return gulp.src('./dist/*')
		.pipe(plugins.size({
			showFiles: true,
			title: 'File Size:'
		}))
		.pipe(plugins.size({
			showFiles: true,
			gzip: true,
			title: 'File Size (gzipped):'
		}));

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

gulp.task('default', ['build', 'size']);