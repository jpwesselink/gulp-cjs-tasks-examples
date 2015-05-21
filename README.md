# Examples for gulp-cjs-tasks

*Create gulp tasks using commonjs conventions*

This repository contains examples which align with [version 1.0.0](https://github.com/sytac/gulp-cjs-tasks/tree/1.0.0) of [`gulp-cjs-tasks`](https://github.com/sytac/gulp-cjs-tasks), you can find its repository [here](https://github.com/sytac/gulp-cjs-tasks/tree/1.0.0).
gulp-cjs-tasks is a node module which allows you to create gulp tasks using commonjs conventions rather than using the `gulp.task` function.

### Putting the money where the mouth is.

All examples in the `./tasks` directory are fully functional and can be executed on the command line,
type `gulp help` for options. Note that this will not display all tasks since
some have no description and will not show up in the help task output.


## Examples

- Module with task with a callback
- Module with task with a promise
- Module with task which exports an object, without gulp
- Module with task which exports a function, with gulp


### A generic task

Just an ordinary task with a description which will pop up in the `gulp help` task.

```js
// ./tasks/generic.js
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

```


### Exporting an object

One of the ways to create a task module is by exporting an object. Note that
you have no access to other gulp tasks using this method.

```js
// ./tasks/exporting-an-object.js
module.exports = {
	'exported-as-object': function(done) {
		console.log('task exported-as-object');
		done();
	}
};

```

### Exporting a function

Another way to create a task module is by exporting a function which takes `gulp`
as an argument, so you can have access to other gulp tasks. Next to that any
subsequent arguments are passed to the tasks modules as well. This can come in
handy to pass along plugin loaders, state modules or any other useful purpose
you can come up with.

```js
// ./tasks/exporting-a-function.js
module.exports = function(gulp) {
	return function(done) {
		console.log('exporting-a-function');
		done();
	};
};

```

Here's a small example using a task loader with multiple arguments. You can find
the actual example in `./examples/passing-multiple-arguments`.

```js
// ./examples/passing-multiple-arguments/gulpfile.js
var gulp = require('gulp');

var taskLoader = require('gulp-cjs-tasks/task-loader');

var foo = 'foo!';
var bar = 'bar!';

var taskNames = taskLoader(__dirname + '/tasks', gulp, foo, bar);

console.log('Added tasks:', taskNames.join(', '));

var taskInfo = require('gulp-cjs-tasks/task-info');

taskInfo(gulp)
  .addHelpTask();

```

```js
// ./examples/passing-multiple-arguments/tasks/multiple.js
module.exports = function(gulp, foo, bar) {
	var tasks = {
		'multiple': function() {
			console.log('second argument', foo);
			console.log('third argument', bar);
		}
	};

	return tasks;
};

```

To try this setup change your working directory to `./examples/passing-multiple-arguments`.

```bash
$ cd examples/passing-multiple-arguments
$ gulp multiple
```

### A real world task: readme generation

As a bonus, the beefiest of 'em all: the task that creates this readme file.

```js
// ./tasks/readme.js
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

```


## About

## Version alignment with gulp-cjs-tasks

As rule of thumb every tagged version of this examples project aligns with the
corresponding version of `gulp-cjs-tasks`. Be wary of the master and develop
branches, these are not released and the readme files contains references to either
the latest tag or a future tag.

## Todo

- [ ] `gulp help` optional argument to show all tasks.
- [ ] Display of task graph.
- [ ] Task documentation generation.

