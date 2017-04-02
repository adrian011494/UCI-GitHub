'use strict';

var gulp = require('gulp');
var zip = require('gulp-zip');

var files = ['manifest.json','mycode.js', 'jquery.min.js', 'jquery.msgBox.min.js', 'jquery.msgBox.min.css', 'background.html', 'redirect.js', '*.svg', '*.png'];
var xpiName = 'myext.xpi';

gulp.task('default', function() {
    console.log(files, xpiName)
    gulp.src(files)
        .pipe(zip(xpiName))
        .pipe(gulp.dest('.'));
});
