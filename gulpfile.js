var gulp = require('gulp');
var sass = require('gulp-sass');
var minCss = require('gulp-clean-css');
var minJs = require('gulp-uglify');
var server = require('gulp-webserver');
var babel = require('gulp-babel');
//编译scss   压缩css
gulp.task('minCss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('./src/css'))
})

//监听scss
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('minCss'))
})

//整合任务
gulp.task('dev', gulp.series('minCss', 'watch'))