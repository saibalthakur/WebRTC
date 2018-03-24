var gulp = require('gulp');
var ts = require('gulp-typescript');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var tsproject = ts.createProject('tsconfig.json');

gulp.task('build', function() {
    return browserify({
        debug: true,
        entries: ['src/websip.ts'],
        standalone : "websip"
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('sip.js'))
    .pipe(gulp.dest("dist"));
})