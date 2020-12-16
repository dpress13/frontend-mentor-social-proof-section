const autoprefixer = require("autoprefixer");
const browserSync = require('browser-sync').create();
// const cleanCSS = require('gulp-clean-css');
const cssnano = require("cssnano");
const gulp = require('gulp');
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require('gulp-sass');


// Compile SCSS --> CSS --> Minified CSS & Auto-Sync Into Browsers
function style() {
    return gulp
    .src('assets/css/src/scss/*.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    // .pipe(sass().on('error', sass.logError)) //Original
    .pipe(gulp.dest('assets/css/src'))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("assets/css/site"))
    .pipe(browserSync.stream());
}

// Browsersync - Static Server + Watch SCSS/HTML5 Files
function watch() {
    browserSync.init({
        server: {
           baseDir: "./assets",
           index: "../index.html"
        }
    });
    gulp.watch('assets/css/src/scss/*.scss', style)
    gulp.watch('./*.html').on('change', browserSync.reload);
    // gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

// Exports
exports.style = style;
exports.watch = watch;

// Set Default Task
gulp.task('default', watch);
