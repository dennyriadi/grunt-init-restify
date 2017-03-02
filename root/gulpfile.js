'use strict';

var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  mocha = require('gulp-spawn-mocha'),
  nodemon = require('gulp-nodemon');

gulp.task('lint', function() {
  var src = [
    './gulpfile.js',
    './app.js',
    './config.js',
    './logger.js',
    'server/**/*.js',
    'test/**/*.js'
  ];

  gulp.src(src)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'app.js',
    ext: 'js json',
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('test', function () {
  return gulp.src('test/**/*.js', {read: false})
    .pipe(mocha({
      env: {'NODE_ENV': 'test'},
      ui: 'bdd',
      istanbul: {
        dir: 'test_coverage/'
      },
      reporter: 'spec'
    }));
});

gulp.task('default', ['lint','test']);