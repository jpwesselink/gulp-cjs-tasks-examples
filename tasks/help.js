module.exports = function(gulp) {
    var helpUtils = require('gulp-cjs-tasks/help')(gulp);

    return {
        help: {
            fn: help,
            help: 'Show help'
        }
    };

    function help() {
        helpUtils.show();
    }
}
