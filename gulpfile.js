const gulp        = require('gulp');
const sass        = require('gulp-sass');
const browserSync = require('browser-sync').create();

// Compile SCSS into CSS & Auto-Sync Into Browsers
function style() {
    return gulp.src('assets/css/src/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('assets/css/site'))
    .pipe(browserSync.stream());
}

exports.style = style;

// Browsersync - Static Server + Watch SCSS/HTMLS Files
function watch() {
    browserSync.init({
        server: {
           baseDir: "./assets",
           index: "../index.html"
        }
    });
    gulp.watch('assets/css/src/*.scss', style)
    gulp.watch('./*.html').on('change',browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.watch = watch;

// Set Default Task
    gulp.task('default', watch);
