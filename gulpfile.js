const autoprefixer = require("autoprefixer");
const browserSyncInstance = require('browser-sync').create();
const cssnano = require("cssnano");
const gulp = require('gulp');
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require('gulp-sass');
const webpack = require('webpack');
const webpackConfig = require("./webpack.config.js");
const webpackStream = require('webpack-stream');

const css = () => {
  return gulp
    .src('src/scss/styles.scss')
    .pipe(sass())
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest('dist'))
    .pipe(browserSyncInstance.stream())
};

const js = () => {
  return gulp.src('src/ts/main.ts')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('dist'))
    .pipe(browserSyncInstance.stream())
};

const browserSync = (done) => {
  browserSyncInstance.init({
    server: {
      baseDir: 'dist'
    },
    port: 3000
  });
  done();
}

const browserSyncReload = (done) => {
  browserSyncInstance.reload();
}

const watchFiles = () => {
  gulp.watch('src/scss/**/*.scss', css);
  gulp.watch('src/ts/**/*.ts', js);
  gulp.watch("dist/*.html").on('change', browserSyncReload);
};

const watch = gulp.series(
  gulp.parallel(js, css),
  gulp.parallel(watchFiles, browserSync)
);

exports.css = css;
exports.js = js;
exports.watch = watch;
exports.default = watch;