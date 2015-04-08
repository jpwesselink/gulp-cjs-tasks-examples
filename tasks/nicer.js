module.exports = function(gulp) {
    return {
        nicer: nicer
    }
};

function nicer() {
    return gulp.src('./foo')
        .pipe(gulp.dest('./bar'));
}
