const gulp        = require('gulp');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

// Compile SCSS into CSS & Auto-Sync Into Browsers
function style() {
    return gulp.src('assets/css/src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets/css/src'))
    .pipe(browserSync.stream());
}

exports.style = style;


// Browsersync - Static Server + Watch SCSS/HTML5 Files
function watch() {
    browserSync.init({
        server: {
           baseDir: "./assets",
           index: "../index.html"
        }
    });
    gulp.watch('assets/css/src/*.scss', style)
    gulp.watch('./*.html').on('change',browserSync.reload);
    // gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.watch = watch;

// Set Default Task
    gulp.task('default', watch);
