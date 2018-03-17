const gulp = require('gulp');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const watchPath = require('gulp-watch-path');
const minifycss = require('gulp-minify-css');
const imagemin = require('gulp-imagemin');
// const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');

gulp.task('watchjs', function () {
    gulp.watch('src/js/*.js', function (event) {
        var paths = watchPath(event, 'src/', 'dist/')
        /*
        paths
            { srcPath: 'src/js/log.js',
              srcDir: 'src/js/',
              distPath: 'dist/js/log.js',
              distDir: 'dist/js/',
              srcFilename: 'log.js',
              distFilename: 'log.js' }
        */
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist' + paths.distPath)

        gulp.src(paths.srcPath)
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(uglify().on('error', function (e) {
                console.log(e);
            }))
            .pipe(gulp.dest(paths.distDir))
    })
})

gulp.task('watchcss', function () {
    gulp.watch('src/css/*.css', function (event) {
        const paths = watchPath(event, 'src/css/', 'dist/css/')
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist' + paths.distPath)
        gulp.src(paths.srcPath)
            .pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(minifycss())
            .pipe(gulp.dest(paths.distDir))

    })
})

gulp.task('watchimage', function () {
    gulp.watch('src/image/*', function (event) {
        var paths = watchPath(event, 'src/', 'dist/')

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist' + paths.distPath)

        gulp.src(paths.srcPath)
            .pipe(imagemin({
                progressive: true
            }))
            .pipe(gulp.dest(paths.distDir))
    })
})
gulp.task('default', ['watchcss', 'watchjs', 'watchimage'])
