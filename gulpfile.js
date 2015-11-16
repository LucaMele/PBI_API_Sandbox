/**
 * Created by lmele on 27.10.2015.
 */
var gulp = require('gulp'),
    template = require('gulp-template-compile'),
    concat  = require('gulp-concat'),
    clean = require('gulp-clean');

gulp.task('jst', ['clean'], function () {
    gulp.src('./public/templates/**/*.html')
        .pipe(template())
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('./public/templates'));
});

gulp.task('clean', function () {
    return gulp.src('./public/templates/templates.js', {read: false})
        .pipe(clean({force: true}));
});

gulp.task('default', ['jst']);
gulp.task('dev', ['jst'], function() {
	gulp.watch('public/templates/**/*.html', ['jst']);
});
