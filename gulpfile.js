var gulp = require('gulp'),
    react = require('gulp-react'),
    concat = require('gulp-concat');

gulp.task('build', function() {
  return gulp.src('views/**/*.jsx')
    .pipe(react())
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('views'));
});
