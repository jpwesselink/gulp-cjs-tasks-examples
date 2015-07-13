var gulp = require('gulp'),
	path = require('path');

var taskLoader = require('gulp-cjs-tasks/task-loader');

var foo = 'foo!';
var bar = 'bar!';

var tasks = taskLoader.load(path.resolve(__dirname, 'tasks'), gulp, foo, bar);
tasks.addHelpTask();


console.log(tasks);
console.log('Added tasks:', tasks.taskNames.join(', '));
