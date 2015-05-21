module.exports = function(gulp) {
  var gutil = require('gulp-util');

  var tasks = {
    'generic': {
      fn: genericTask,
      description: 'Just a generic task',
      options: {
        '-o, --option': 'An option',
        '-a, --another': 'Another option'
      }
    }
  };

  return tasks;

  function genericTask(done) {
    console.log('A generic task', gutil.env);
    done();
  }

};
