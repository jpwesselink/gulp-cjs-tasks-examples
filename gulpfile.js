var gulp = require('gulp'),
	path = require('path');

var taskLoader = require('gulp-cjs-tasks/task-loader');

var tasks = taskLoader.load(path.join(__dirname, 'tasks'), gulp);

tasks
	.addHelpTask();
