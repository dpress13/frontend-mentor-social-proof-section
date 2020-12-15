"use strict";

// Load Plugins
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
// const cp = require("child_process");
const cssnano = require("cssnano");
// const del = require("del");
// const eslint = require("gulp-eslint");
const gulp = require("gulp");
// const imagemin = require("gulp-imagemin");
// const newer = require("gulp-newer");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
// const webpack = require("webpack");
// const webpackconfig = require("./webpack.config.js");
// const webpackstream = require("webpack-stream");

// BrowserSync

// Define Server, Index.html File & Port
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./assets",
      index: "../index.html" // Added this entire line
    },
    port: 3000
  });
  done();
}

// Reload Browser
function browserSyncReload(done) {
  browsersync.reload({stream: true}); //Added {stream: true}
  done();
}

// // Clean Assets
// function clean() {
//   return del(['./_site/assets/']);
// }

// // Optimize Images
// function images() {
//   return gulp
//     .src("./assets/img/**/*")
//     .pipe(newer("./_site/assets/img"))
//     .pipe(
//       imagemin([
//         imagemin.gifsicle({ interlaced: true }),
//         imagemin.jpegtran({ progressive: true }),
//         imagemin.optipng({ optimizationLevel: 5 }),
//         imagemin.svgo({
//           plugins: [
//             {
//               removeViewBox: false,
//               collapseGroups: true
//             }
//           ]
//         })
//       ])
//     )
//     .pipe(gulp.dest("./_site/assets/img"));
// }

// SCSS --> CSS --> Minified CSS
function css() {
  return gulp
    .src("assets/css/src/scss/*.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("assets/css/src/"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("assets/css/site"))
    .pipe(browsersync.stream());
}

// // Lint scripts
// function scriptsLint() {
//   return gulp
//     .src(["./assets/js/**/*", "./gulpfile.js"])
//     .pipe(plumber())
//     .pipe(eslint())
//     .pipe(eslint.format())
//     .pipe(eslint.failAfterError());
// }

// // Transpile, concatenate and minify scripts
// function scripts() {
//   return (
//     gulp
//       .src(["./assets/js/**/*"])
//       .pipe(plumber())
//       .pipe(webpackstream(webpackconfig, webpack))
//       // folder only, filename is specified in webpack config
//       .pipe(gulp.dest("./_site/assets/js/"))
//       .pipe(browsersync.stream())
//   );
// }

// // Jekyll
// function jekyll() {
//   return cp.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit" });
// }

// Watch Files
function watchFiles() {
  gulp.watch("assets/css/src/scss/*.scss", css);
  gulp.watch('./*.html').on('change',browserSyncReload); // Added this entire line
  // gulp.watch('./js/**/*.js').on('change', browserSync.reload); Added this entire line
  // gulp.watch("./assets/js/**/*", gulp.series(scriptsLint, scripts));
  // gulp.watch(
  //   [
  //     "./_includes/**/*",
  //     "./_layouts/**/*",
  //     "./_pages/**/*",
  //     "./_posts/**/*",
  //     "./_projects/**/*"
  //   ],
  //   gulp.series(jekyll, browserSyncReload)
  // );
  // gulp.watch("./assets/img/**/*", images);
}

// define complex tasks
// const js = gulp.series(scriptsLint, scripts);
// const build = gulp.series(clean, gulp.parallel(css, images, jekyll, js));
// const build = css; // Added This
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
// exports.images = images;
exports.css = css;
// exports.js = js;
// exports.jekyll = jekyll;
// exports.clean = clean;
// exports.build = build;
exports.watch = watch;
exports.default = watch;
