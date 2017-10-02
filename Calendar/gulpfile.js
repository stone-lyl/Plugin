var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var watchPath = require('gulp-watch-path');
var combiner = require('stream-combiner2');
var minifycss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');

var handleError = function (error) {
    var colors = gutil.colors;
    console.log('\n');
    gutil.log(colors.red('Error!'))
    gutil.log('fileName:' + colors.red(error.fileName))
    gutil.log('lineNumber: ' + colors.red(error.lineNumber))
    gutil.log('message: ' + colors.red(error.message))
    gutil.log('plugin: ' + colors.red(error.plugin))
}

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
        gutil.log('Dist'+ ' ' + paths.distPath)
        
        var combined = combiner.obj([
            gulp.src(paths.srcPath),
                uglify(),
                gulp.dest(paths.distDir)
        ])

        combined.on('error', handleError)
    })
})

gulp.task('watchsass', function () {
    gulp.watch('src/sass/*.scss', function (event) {
        var paths = watchPath(event, 'src/sass/', 'dist/css')
        gutil.log(gutil.colors.green(event.type)+ ' ' +paths.srcPath)
        gutil.log('Dist' + paths.distPath)

        sass(paths.srcPath)
            .on('error', function (error) {
                console.error('Error', error.message);
            })
            .pipe(autoprefixer({
                browsers: 'last 2 versions'
            }))
            .pipe(minifycss())
            .pipe(gulp.dest(paths.distDir))

    })
})

gulp.task('watchimage', function () {
    gulp.watch('src/image/*', function (event) {
        var paths = watchPath(event, 'src/', 'dist/')

        gutil.log(gutil.colors.green(event.type)+ ' ' + paths.srcPath)
        gutil.log('Dist' + paths.distPath)

        gulp.src(paths.srcPath)
            .pipe(imagemin({
                progressive: true
            }))
            .pipe(gulp.dest(paths.distDir))
    })
})
gulp.task('default', ['watchjs', 'watchsass', 'watchimage'])
