const gulp = require("gulp");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const imageResize = require('gulp-image-resize');
const imagemin = require('gulp-imagemin');
const merge2 = require('merge2');
const uglify = require('gulp-uglify');
const inline = require('gulp-inline');

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
      .pipe(gulp.dest("dist/views/images")),
    
    gulp.src("views/images/pizzeria.jpg")
      .pipe(imageResize({
        imageMagick: true,
        width : 720,
        height : 540,
        quality: 0.4
      }))
      .pipe(imagemin())
      .pipe(rename({suffix: ".header"}))
      .pipe(gulp.dest("dist/views/images")),
    gulp.src("img/*")
      .pipe(imagemin())
      .pipe(gulp.dest("dist/img")),
    gulp.src("views/images/pizza.png")
      .pipe(imagemin())
      .pipe(gulp.dest("dist/views/images"))
    );
});

gulp.task("inline-resources", function() {
  let folders = ["", "views/"];

  let tasks = folders.map(function(folder) {
    return gulp.src(folder + "*.html")
      .pipe(inline({
        css: function() {
          return cssmin({keepSpecialComments : 0});
        },
        js: uglify,
        disabledTypes: ['svg', 'img']
      }))
      .pipe(gulp.dest("dist/" + folder));
  });
  
  return merge2(tasks);
});

gulp.task("default", function() {
  gulp.run("image-optimize", "inline-resources");
});