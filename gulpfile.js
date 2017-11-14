var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    gulp.src('./project/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe (autoprefixer('last 2 versions', '> 5%'))
        .pipe (minifyCSS())
        .pipe(gulp.dest('./project/css'))
        .pipe(browserSync.stream());
})

gulp.task('sass:watch', function () {
    gulp.watch('./project/**/*scss', ['sass']);
})

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./project"
    });

    gulp.watch("./project/sass/*.scss", ['sass']);
    gulp.watch("./project/*.html").on('change', browserSync.reload);
});
