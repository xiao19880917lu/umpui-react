var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');
    //jshint=require('gulp-jshint');
    //语法检查
    /*gulp.task('jshint',function () {
        return gulp.src('js/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });*/
    //压缩css
    gulp.task('minifycss',function() {
        return gulp.src(['dist/css/bootstrap.css','dist/css/app_theme.css'])    //需要操作的文件
            .pipe(concat('common.css'))
            .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
            .pipe(minifycss())   //执行压缩
            .pipe(gulp.dest('dist/css'));   //输出文件夹
    });
    //压缩scss
    gulp.task('minifyscss',function() {
        return gulp.src('sass/*.scss')    //需要操作的文件
            .pipe(concat('common.scss'))
            //.pipe(sass({style: 'compressed'}))
            //.pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
            // .pipe(minifycss())   //执行压缩
            .pipe(gulp.dest('sass'));   //输出文件夹
    });
    //压缩，合并 js
    /*gulp.task('minifyjs',function() {
        return gulp.src('js/*.js')      //需要操作的文件
            .pipe(concat('main.js'))    //合并所有js到main.js
            .pipe(gulp.dest('js'))       //输出到文件夹
            .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
            .pipe(uglify())    //压缩
            .pipe(gulp.dest('Js'));  //输出
    });*/
    // 搭建文件夹
    // 讲umpui-react下的css等文件copy出来
    /*gulp.task('src-dist', function() {
        gulp.src('./AA/.css')
            .pipe(gulp.dest("./dist"));        
    });*/
　　//默认命令，在cmd中输入gulp后，执行的就是这个任务(压缩js需要在检查js之后操作)
    gulp.task('default', function() {
        gulp.start('minifycss'); 
　　});
