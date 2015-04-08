# gulp-cjs-tasks-examples

*Create gulp tasks using commonjs conventions*

This repository only contains examples for `gulp-cjs-tasks`, you
can find its repository [here](https://github.com/sytac/gulp-cjs-tasks)

## Examples
For usage, take a look at [the example repository](https://github.com/sytac/gulp-csj-tasks-example)


## Examples

Initialize a new project:

```bash
$ npm init
```

Install this library:

```bash
$ npm install --save-dev gulp-cjs-tasks
```

Create your `gulpfile.js`

```js

// gulpfile.js
var gulp = require('gulp')
    taskLoader = require('gulp-cjs-tasks/task-loader');

var taskNames = taskLoader(__dirname + '/tasks', gulp);

console.log('Added tasks', taskNames);


```

And create a task module in `./tasks/foo.js`

```js

// ./tasks/foo.js
module.exports = function (gulp){
	return fooTask;
};

function fooTask(done){
	console.log('Foo!');
	done();
}

```

Open a shell and fire your fine new `foo` task:

```bash
$ gulp foo
```


### Help tasks

Create `./tasks/help.js`:

```js

module.exports = function(gulp) {
    var helpUtils = require('gulp-cjs-tasks/help')(gulp);

    var tasks = {
        help: {
            fn: help,
            help: 'Show help'
        }
    };

    return tasks;

    function help() {
        helpUtils.show();
    }
}

```


```bash
$ gulp help
[14:04:25] Added tasks help
[14:04:25] Using gulpfile ~/gulpfile.js
[14:04:25] Starting 'help'...
Usage
  gulp task [ option ... ]

Tasks
  help   : Show help
[14:04:25] Finished 'help' after 1.29 ms
```
