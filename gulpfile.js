var gulp = require('gulp');

var taskLoader = require('gulp-cjs-tasks/task-loader');

var taskNames = taskLoader(__dirname + '/tasks', gulp);

var taskInfo = require('gulp-cjs-tasks/task-info');

taskInfo(gulp)
  .addHelpTask();
