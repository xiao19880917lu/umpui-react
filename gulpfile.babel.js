/**
 * @file gulp config file
 * @author luyongfang
 * */
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
/* var jshint=require('gulp-jshint');
语法检查
gulp.task('jshint',function () {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});*/
// 压缩css
gulp.task('minifycss', function () {
    return gulp.src(['dist/css/bootstrap.css', 'dist/css/vendor.bundle.css', 'dist/css/app.css', 'dist/css/app/*'])
    // 需要操作的文件
        .pipe(concat('common2.css'))
        .pipe(rename({suffix: '.min'}))
    // rename压缩后的文件名
        .pipe(minifycss())
    // 执行压缩
        .pipe(gulp.dest('dist/css'));
    // 输出文件夹
});
gulp.task('minifycss2', function () {
    return gulp.src(['dist/css/bootstrap.css', 'dist/css/app.css', 'dist/css/amazeui.min.css', 'dist/css/extra/*'])
    // 需要操作的文件
        .pipe(concat('common3.css'))
        .pipe(rename({suffix: '.min'}))
    // rename压缩后的文件名
        .pipe(minifycss())
    // 执行压缩
        .pipe(gulp.dest('dist/css'));
    // 输出文件夹
});
// 压缩scss
gulp.task('minifyscss', function () {
    return gulp.src('sass/*.scss')
        .pipe(concat('common.scss'))
        .pipe(sass({style: 'compressed'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('sass'));
});
// 压缩，合并 js
/*gulp.task('minifyjs',function() {
    return gulp.src('js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('Js'));
});*/
// 搭建文件夹 讲umpui-react下的css等文件copy出来
/*gulp.task('src-dist', function() {
    gulp.src('./AA/.css')
        .pipe(gulp.dest("./dist"));
});*/
　　// 默认命令，在cmd中输入gulp后，执行的就是这个任务(压缩js需要在检查js之后操作)
gulp.task('default', function () {
    gulp.start('minifycss2');
　　});
