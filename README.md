# Examples for gulp-cjs-tasks

*Create gulp tasks using commonjs conventions*

This repository contains examples which align with [version 1.0.0](https://github.com/sytac/gulp-cjs-tasks/tree/1.0.0) of [`gulp-cjs-tasks`](https://github.com/sytac/gulp-cjs-tasks), you can find its repository [here](https://github.com/sytac/gulp-cjs-tasks/tree/1.0.0).
gulp-cjs-tasks is a node module which allows you to create gulp tasks using commonjs conventions rather than using the `gulp.task` function.

## Introduction

### Description

### Putting the money where the mouth is.

All examples in the `./tasks` directory are fully functional and can be executed on the command line,
type `gulp help` for options. Note that this will not display all tasks since
some have no description and will not show up in the help task output.

Standalone examples can be found in `./examples`.

## Installation

```bash
$ npm install
```


## Rationale

- Module with task with a callback
- Module with task with a promise
- Module with task which exports an object, without gulp
- Module with task which exports a function, with gulp

## Task modules
###
#### A generic task

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


#### Exporting an object

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

#### Exporting a function

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

var tasks = taskLoader.load(__dirname + '/tasks', gulp, foo, bar);
tasks.addHelpTask();


console.log(tasks);
console.log('Added tasks:', tasks.taskNames.join(', '));

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


## Optional arguments

// simple example
// inherited arguments

## Sequences

// simple example
// elaborate example
## Dependencies
## Prioritization

### Ordering of tasks in help context

Task modules are loadable in alphabetical order, however I have only tested this
on a Mac. If you experience different behaviour please create an issue.

Alphabetical ordering is not always the best solution, that's why it's possible
to do a manual prioritization of tasks by adding a `priority` option.

The priority for the first task is `-10`, for every subsequently added task the
priority will decrease with `10` unless a `priority` option is set.

If a `help` task is added using `taskInfo`, it will have a priority of `0`, which
makes it show on top of the task list.
If you'd like to have your task show up on top give it a `priority` anything bigger
than `0`.

```js
// ./tasks/info.js
module.exports = function(gulp) {
  var tasks = {
    'info': {
      fn: infoTask,
      description: 'An info task with a high priority',
      priority: 100
    }
  };

  return tasks;

  function infoTask() {
    console.log('This task has a priority of 100 and will show up on top.');
  }
};

```

(Why `10`? It will cut you some slack if you want to move tasks around.)


## Self generating documentation
,,,,,,,,,,,,,,,,,,,,,
### tasks/help.js

You can automatically create a help task by `task-info`. See the `gulpfile.js` in the root of this project. The part that does the dirty work is this:

```js

var taskInfo = require('gulp-cjs-tasks/task-info');

taskInfo(gulp)
  .addHelpTask();

```

The `taskInfo` module factory will take the `gulp` object as an argument, and will
return an object.

```js
{
  addHelpTask: addHelpTask,
  cliHelp: cliHelp,
  getTasks: getTasks
}
```

Function | Description
---------- | -------------
addHelpTask | The start date is after end date.
cliHelp | The start date is before the current date.
getTasks | The start date is before the current date.


#### addHelpTask

#### cliHelp

#### getTasks







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

var tree = require('cli-tree');

module.exports = function(gulp) {
	var tasks = {
		readme: {
			fn: readme,
			description: 'Creates readme file'
		},
		'readme-watch': {
			fn: readmeWatcher,
			dep: ['readme'],
			description: 'Creates readme on changes'
		}
	};

	return tasks;

	function readme() {
		var taskInfo = require('gulp-cjs-tasks/task-info')(gulp);
		var current,
			templateData = {
				k: taskInfo.getTasks(),
				package: require('../package.json')
			};

		[{
			base: './',
			src: ['tasks/**/*.js', '*.js'],
			namespace: 'js',
			wrapper: function(rendered, config) {
				return ['```js', '// ' + config.file, rendered, '```'].join(
					'\n');
			}
		}, {
			base: './examples/',
			src: ['**/*.js', '!**/node_modules/**/*.js'],
			namespace: 'examples',
			wrapper: function(rendered, config) {
				return ['```js', '// ' + config.file, rendered, '```'].join(
					'\n');
			}
		}, {
			base: './templates/docs/partials/',
			src: '**/*.md'
		}].map(function(parseable) {

			var patterns, sorted, source;

			if (parseable.namespace && !templateData[parseable.namespace]) {
				templateData[parseable.namespace] = {};
				current = templateData[parseable.namespace];
			} else {
				current = templateData;
			}

			source = lang.isArray(parseable.src) ? parseable.src : [parseable
				.src
			];

			patterns = source.map(function(src) {
				if (src.indexOf('!') === 0) {
					return '!' + parseable.base + src.substring(1);
				} else {
					return parseable.base + src;
				}
			});

			sorted = globule.find(patterns)
				.map(function(file) {
					var pathArrays = array.remove(path.relative(parseable.base,
								path.dirname(
									file))
							.split(path.sep),
							function(pathPart) {
								if (pathPart !== '') {
									return true;
								}
							})
						.map(string.camelCase);

					return {
						parseable: parseable,
						file: file,
						depth: pathArrays
					};
				})
				.sort(function(a, b) {
					if (a.depth.length === b.depth.length) {
						return 0;
					} else if (a.depth.length > b.depth.length) {
						return -1;
					} else {
						return 1;
					}
				})
				.map(function(config) {
					var basename, local, rendered, value;

					basename = string.camelCase(path.basename(config.file, path
						.extname(
							config.file)));

					local = current;

					config.depth
						.map(function(part) {
							if (part !== '') {
								if (!local[part]) {
									local[part] = {};
								}
								local = local[part];
							}
						});

					value = fs.readFileSync(config.file, 'utf8');

					try {
						rendered = string.template(value)(templateData);

						if (lang.isFunction(config.parseable.wrapper)) {
							rendered = config.parseable.wrapper(rendered, config);
						}
						local[basename] = rendered;
					} catch (err) {
						// gracefully fail missing objects
						console.log('---', err, 'in', config.file);
					}

					return config;
				});
		});

		tree(templateData);

		return gulp.src('./templates/docs/*.md')
			.pipe(template(templateData))
			.pipe(gulp.dest('./'));
	}

	function readmeWatcher() {
		// As you can see, this is a regular, run off the mill gulp.watch function call
		gulp.watch(['./tasks/*.js', './*.js', './examples/**/*.js',
			'./templates/**'
		], ['readme']);
	}
}

```


## About

## Version alignment with gulp-cjs-tasks

As rule of thumb every tagged version of this examples project aligns with the
corresponding version of `gulp-cjs-tasks`. Be wary of the master and develop
branches, these are not released and the readme files contains references to either
the latest tag or a future tag.

## Todos

- [ ] `gulp help` optional argument to show all tasks.
- [ ] `gulp help` optional argument to show debug features like task priority.
- [ ] Display of task graph.
- [ ] Task documentation generation.

