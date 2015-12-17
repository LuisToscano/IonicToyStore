var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var ugly = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

var paths = {
    sass: ['./scss/**/*.scss'],
    js: ['./www/js/base/*.js']
};

gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
    gulp.src('./scss/ionic.app.scss')
            .pipe(sass())
            .on('error', sass.logError)
            .pipe(gulp.dest('./www/css/'))
            .pipe(minifyCss({
                keepSpecialComments: 0
            }))
            .pipe(rename({extname: '.min.css'}))
            .pipe(gulp.dest('./www/css/'))
            .on('end', done);
});

gulp.task('prepare-js', function (done) {
	gulp.src(['./www/js/base/app.js','./www/js/base/toy-store.js'])
                .pipe(concat('concat.js'))
		.pipe(ngAnnotate())
                .on('error', gutil.log)
                .pipe(rename({extname: '.min.js'}))
		.pipe(gulp.dest('./temp-js/'))
                .on('end', done);
        
});

gulp.task('ugly-js', function (done) {
    gulp.src('./temp-js/concat.min.js')
            .pipe(ugly())
            .on('error', gutil.log)
            .pipe(rename('ugly.js'))
            .pipe(gulp.dest('./www/js/'))
            .on('end', done);
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['prepare-js','ugly-js']);
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
            .on('log', function (data) {
                gutil.log('bower', gutil.colors.cyan(data.id), data.message);
            });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
                '  ' + gutil.colors.red('Git is not installed.'),
                '\n  Git, the version control system, is required to download Ionic.',
                '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
                '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
                );
        process.exit(1);
    }
    done();
});
