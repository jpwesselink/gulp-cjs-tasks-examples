var conflict = require('gulp-conflict'),
  fs = require('fs'),
  globule = require('globule'),
  lang = require('lodash/lang'),
  path = require('path'),
  array = require('lodash/array'),
  string = require('lodash/string'),
  template = require('gulp-template');

module.exports = function(gulp) {
  var tasks = {
    readme: {
      fn: readme,
      description: 'Creates readme file'
    }
  };

  return tasks;

  function readme() {

    var data = {
      package: require('../package.json')
    };

    [{
      src: ['./tasks/*.js', './*.js'],
      namespace: 'js',
      wrap: wrapJs
    }, {
      src: ['./examples/**/*.js'],
      namespace: 'examplesJs',
      wrap: wrapJs
    }, {
      src: './templates/docs/tasks/*.md',
      namespace: 'tasks',
      wrap: wrapTemplate
    }, {
      src: './templates/docs/about/*.md',
      namespace: 'about',
      wrap: wrapTemplate
    }]
    .map(function(pattern) {
      if (!data[pattern.namespace]) {
        data[pattern.namespace] = {};
      }

      // make this non-blocking
      globule.find(pattern.src)
        .map(function(file) {
          var templateVar = string.camelCase(path.basename(file, path
            .extname(
              file)));
          var taskSource = fs.readFileSync(
            file,
            'utf8');
          if (lang.isFunction(pattern.wrap)) {
            taskSource = pattern.wrap(file, taskSource);
          }

          data[pattern.namespace][templateVar] = taskSource;
        });
    });

    return gulp.src('./templates/docs/*.md')
      .pipe(template(data))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'));

    // hoistables

    function wrapJs(file, contents) {
      return ['```js', '// ' + file, contents, '```'].join('\n');
    }

    function wrapTemplate(file, contents) {
      return string.template(contents)(data);
    }
  }
}
