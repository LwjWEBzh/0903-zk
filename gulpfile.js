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

//压缩js
gulp.task('minJs', function() {
        return gulp.src(['./src/js/**/*.js', '!./src/js/commonjs/*.js'])
            .pipe(babel())
            .pipe(minJs())
            .pipe(gulp.dest('./src/libs'))
    })
    //监听js
gulp.task('watch', function() {
    return gulp.watch('./src/js/**/*.js', gulp.series('minJs'))
})

//整合任务
gulp.task('dev', gulp.series('minCss', 'minJs', 'watch'))