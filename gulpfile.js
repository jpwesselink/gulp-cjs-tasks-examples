var gulp = require('gulp');

var taskLoader = require('gulp-cjs-tasks/task-loader');

var taskNames = taskLoader(__dirname + '/tasks', gulp);

console.log('Added tasks:', taskNames.join(', '));
