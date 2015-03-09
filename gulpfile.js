var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util'),
    nodemon = require('nodemon');

require('colors');

function scripts(watch) {
  var bundle, rebundle;

  bundler = browserify('./views/main.js', {
    basedir: __dirname,
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: watch
  });

  if(watch) {
    bundler = watchify(bundler);
  }

  bundler.transform(reactify);

  rebundle = function() {
    gutil.log('Rebundling')
    var stream = bundler.bundle();
    stream = stream.pipe(source('bundle.js'));
    return stream.pipe(gulp.dest('./dist'));
  }

  bundler.on('update', rebundle);
  return rebundle();
}

gulp.task('build', function () {
  return scripts(false);
});

gulp.task('watch', function () {
  return scripts(true);
});

gulp.task('nodemon', ['watch'], function () {
  return nodemon({
    verbose: true,
    watch: [ 'dist/' ],
    ext: 'hbs jsx',
  }).on('log', function (log) {
    gutil.log('[nodemon]'.yellow, log.message)
  });
});
