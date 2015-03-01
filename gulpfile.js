var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream');

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
