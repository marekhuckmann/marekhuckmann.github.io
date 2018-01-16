var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    browserSync = require("browser-sync");

//scripts
gulp.task('js', function () {
    gulp.src(['./dev/scripts/lib/*.js', './dev/scripts/portfolio.js'])
        .pipe(concat('portfolio.js'))
        .pipe(uglify())
        .pipe(rename('script.min.js'))
        .pipe(gulp.dest('./public/scripts'));
});

//css
gulp.task('css', function () {
    gulp.src(['./dev/styles/lib/*.css', './dev/styles/portfolio.scss'])
        .pipe(concat('portfolio.scss'))
        .pipe(sass())
        .pipe(rename('stylesheet.min.css'))
        .pipe(prefix(
            "last 1 version", "> 1%", "ie 8", "ie 7"
        ))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./public/styles'));
});

//html

gulp.task('default', function () {

    browserSync.init({
        server: "./"
    });
    gulp.watch(["./index.html", "./dev/scripts/*.js", "./dev/styles/*.scss"], browserSync.reload);

    gulp.watch("./dev/styles/*.scss", function (event) {
        gulp.run('css');
    });

    gulp.watch("./dev/scripts/*.js", function (event) {
        gulp.run('js');
    });

});