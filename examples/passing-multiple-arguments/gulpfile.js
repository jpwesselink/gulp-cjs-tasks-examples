var gulp = require('gulp');

var taskLoader = require('gulp-cjs-tasks/task-loader');

var foo = 'foo!';
var bar = 'bar!';

var taskLoader = taskLoader(__dirname + '/tasks', gulp, foo, bar);


var taskInfo = require('gulp-cjs-tasks/task-info');

taskInfo(gulp)
	.addHelpTask();

console.log('Added tasks:', taskLoader.taskNames.join(', '));
