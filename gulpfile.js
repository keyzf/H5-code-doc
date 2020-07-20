const gulp = require('gulp');
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const connect = require('gulp-connect');
const open = require('gulp-open');
const html = require('gulp-html');
const htmlmin = require('gulp-htmlmin');
var watch = require('gulp-watch');

ENTRY_FOLDER = 'src/'
const OUT_FOLDER = 'dist/'

gulp.task('html', ()=> {
    return gulp.src(ENTRY_FOLDER + 'index.html')
        .pipe(html())
        .pipe(htmlmin())
        .pipe(gulp.dest(OUT_FOLDER))
        .pipe(connect.reload());
})

gulp.task('js', function(){
  return gulp.src(ENTRY_FOLDER + 'script/*.js')
    .pipe(minify())
    .pipe(gulp.dest(OUT_FOLDER + 'js'));
}) 

gulp.task('scss', ()=>{
  return gulp.src(ENTRY_FOLDER + 'scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(OUT_FOLDER + 'css'));
}) 

gulp.task("serve", ()=> {
    let server = connect.server({
        root:OUT_FOLDER,
        livereload:true,
        host:'10.169.42.145',
        port:3000
    });
    return gulp.src(OUT_FOLDER)
        .pipe(open({
            app:'chrome',
            uri:`http://${server.host}:${server.port}`
        }))
})

gulp.task('watch', ()=> {
    gulp.watch(ENTRY_FOLDER + 'script/*.js', gulp.series('js'));
    gulp.watch(ENTRY_FOLDER + 'scss/*.scss', gulp.series('scss'));
    watch(OUT_FOLDER).pipe(connect.reload());
})

gulp.task('clean', ()=>{
    return gulp.src(OUT_FOLDER, {allowEmpty: true})
        .pipe(clean());
})

gulp.task('build', gulp.series('clean',gulp.parallel('html', 'js', 'scss')))

gulp.task('default', gulp.parallel('html', 'js', 'scss','serve','watch'))