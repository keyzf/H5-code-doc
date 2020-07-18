const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('default', function() {
    gulp.src('src/*.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('build/'));
})
