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
    //搭建服务器
gulp.task('devServer', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                var pathname = require('url').parse(req.url).pathname;
                console.log(pathname)
                if (pathname === '/favicon.ico') {
                    res.end('');
                    return;
                }
                pathname = pathname === '/' ? '/index.html' : pathname;
                res.end(require('fs').readFileSync(require('path').join(__dirname, 'src', pathname)))
            }
        }))
})

//整合任务
gulp.task('dev', gulp.series('minCss', 'minJs', 'watch'))