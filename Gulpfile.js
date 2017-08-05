const gulp = require("gulp");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const imageResize = require('gulp-image-resize');
const imagemin = require('gulp-imagemin');
const del = require('del');
const merge2 = require('merge2');
const uglify = require('gulp-uglify');

gulp.task("clean", function () {
  return del([
    "css/**/*.min*", 
    "js/*.min*",
    "img/*.otz*",
    "views/css/**/*.min*",
    "views/js/*.min*"
  ]);
});

gulp.task("min-css", function () {
  return merge2( 
    gulp.src("css/**/*.css")
      .pipe(cssmin())
      .pipe(rename({suffix: ".min"}))
      .pipe(gulp.dest('css')),
    gulp.src("views/css/**/*.css")
      .pipe(cssmin())
      .pipe(rename({suffix: ".min"}))
      .pipe(gulp.dest('views/css'))
  );
});

gulp.task("image-optimize", function () {
  return merge2(
    gulp.src("views/images/pizzeria.jpg")
      .pipe(imageResize({
        imageMagick: true,
        width : 70,
        height : 70,
        quality: 0.4
      }))
      .pipe(imagemin())
      .pipe(rename({suffix: ".icon"}))
      .pipe(gulp.dest("views/images")),
    
    gulp.src("views/images/pizzeria.jpg")
      .pipe(imageResize({
        imageMagick: true,
        width : 720,
        height : 540,
        quality: 0.4
      }))
      .pipe(imagemin())
      .pipe(rename({suffix: ".header"}))
      .pipe(gulp.dest("views/images")),
    gulp.src("img/*")
      .pipe(imagemin())
      .pipe(rename({suffix: ".otz"}))
      .pipe(gulp.dest("img"))
    );
});

gulp.task("js-uglify", function() {
  return merge2(
    gulp.src("js/*")
      .pipe(uglify())
      .pipe(rename({suffix: ".min"}))
      .pipe(gulp.dest("js")),
    gulp.src("views/js/*")
      .pipe(uglify())
      .pipe(rename({suffix: ".min"}))
      .pipe(gulp.dest("views/js"))
  );
});

gulp.task("default", ["clean"], function() {
  gulp.run("image-optimize", "min-css", "js-uglify");
});