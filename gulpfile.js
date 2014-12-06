var gulp = require('gulp');
var concat = require('gulp-concat');


gulp.task('build', function () {
  return gulp.src(['src/**/*_module.js', 'src/**/*.js'])
    .pipe(concat('rx-stream.js'))
    .pipe(gulp.dest('./'));
});


gulp.task('default', ['build']);
