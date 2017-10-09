const gulp = require('gulp');
const concat = require('gulp-concat');
const fs = require('fs');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const merge = require('merge-stream');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const bundleconfig = require('./bundleconfig.json');

let regex = {
    css: /\.css$/,
    js: /\.js$/,
    sass: /\.scss$/,
    ts: /\.ts$/
};

let tsproj = ts.createProject('tsconfig.json');

gulp.task('min:js', () => {
    let tasks = getBundles(regex.js).map(bundle =>
        gulp.src(bundle.inputFiles, { base: '.' })
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(tsproj()).js
            .pipe(concat(bundle.outputFileName))
            .pipe(uglify())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('.'))
    );
    return merge(tasks);
});

gulp.task('min:css', () => {
    let tasks = getBundles(regex.css).map(bundle => {
        let css$ = bundle.inputFiles.map(file => {
            let file$ = gulp.src(file, { base: '.' }).pipe(sourcemaps.init());
            return regex.sass.test(file) ? file$.pipe(sass()) : file$;
        });
        return merge(css$)
            .pipe(autoprefixer())
            .pipe(concat(bundle.outputFileName))
            .pipe(cssmin())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('.'));
    });
    return merge(tasks);
});

gulp.task('clean', () => {
    let files = bundleconfig.map(bundle => bundle.outputFileName);
    let maps = bundleconfig.map(bundle => bundle.outputFileName + '.map');
    return del([...files, ...maps]);
});

gulp.task('min', ['min:js', 'min:css']);

gulp.task('watch', () => {
    getBundles(regex.js).forEach(bundle => {
        gulp.watch(bundle.inputFiles, ['min:js']);
    });
    getBundles(regex.css).forEach(bundle => {
        gulp.watch(bundle.inputFiles, ['min:css']);
    });
});

function getBundles(regexPattern) {
    return bundleconfig.filter(function (bundle) {
        return regexPattern.test(bundle.outputFileName);
    });
}
