module.exports = function(gulp) {
    return {
        copy: function() {
            return gulp.src('./README.md')
                .pipe(gulp.dest('./README-copy.md'));
        }
    }
};
