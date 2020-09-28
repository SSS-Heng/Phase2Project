const gulp = require("gulp");
const sass = require("gulp-sass");
const htmlmin = require("gulp-htmlmin");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const { task } = require("gulp");

//拷贝资源，并解析sass
//压缩html和css，并转移资源
function copy_html(){
  return gulp.src("html/*.html")
  .pipe(gulp.dest("output/html/"))
  .pipe(
    htmlmin({
      removeEmptyAttibutes: true, // 移出所有空属性
      collapseWhitespace: true, // 压缩 html
    })
  )
  .pipe(rename(function(path){
    path.basename = path.basename;
    path.extname = ".min.html";
  }))
  .pipe(gulp.dest("output/min/html/"));
}
task(copy_html);

function copy_js(){
  return gulp.src(["js/*.js","!js/jquery-1.11.3.min.js","!js/require.js","!js/jquery.cookie.js"])
  .pipe(
    babel({
      presets: ["es2015"],
    })
  )
  .pipe(gulp.dest("output/js/"));
}
task(copy_js);

function min_js(){
  return gulp.src(["output/js/*.js","!output/js/jquery-1.11.3.min.js","!output/js/require.js","!output/js/jquery.cookie.js"])
  .pipe(uglify())
  .pipe(rename(function(path){
    path.basename = path.basename;
    path.extname = ".min.js";
  }))
  .pipe(gulp.dest("output/min/js/"));
}
task(min_js);

function copy_img(){
  return gulp.src("img/*.{jpg,png}")
  .pipe(gulp.dest("output/img/"))
  .pipe(gulp.dest("output/min/img/"));
}
task(copy_img);

function copy_css(){
  return gulp.src("css/*.css")
  .pipe(gulp.dest("output/css/"))
  .pipe(minifyCSS())
  .pipe(rename(function(path){
    path.basename = path.basename;
    path.extname = ".min.css";
  }))
  .pipe(gulp.dest("output/min/css/"));
}
task(copy_css);

function copy_json(){
  return gulp.src("json/*.json")
  .pipe(gulp.dest("output/json/"))
  .pipe(gulp.dest("output/min/json/"));
}
task(copy_json);

function parse_scss(){
  return gulp.src("sass/*.{sass,scss}")
  .pipe(sass())
  .pipe(rename(function(path){
    path.basename = path.basename;
    path.extname = ".css";
  }))
  .pipe(gulp.dest("output/css/"))
  .pipe(minifyCSS())
  .pipe(rename(function(path){
    path.basename = path.basename;
    path.extname = ".min.css";
  }))
  .pipe(gulp.dest("output/min/css/"));
}
task(parse_scss);

//建立项目
exports.build = gulp.series(gulp.parallel(
  copy_html,
  copy_img,
  copy_js,
  copy_css,
  copy_json,
  parse_scss
),min_js);

//监听
function watch_items(){
  gulp.watch("html/*.html", copy_html);
  gulp.watch("img/*.{jpg,png}", copy_img);
  gulp.watch(["js/*.js","!js/jquery-1.11.3.min.js","!js/require.js","!js/jquery.cookie.js"], copy_js);
  gulp.watch("css/*.css",copy_css);
  gulp.watch("json/*.json", copy_json);
  gulp.watch("sass/*.{sass,scss}", parse_scss);
  gulp.watch(["output/js/*.js","!output/js/jquery-1.11.3.min.js","!output/js/require.js","!output/js/jquery.cookie.js"],min_js);
}

exports.watch = watch_items;