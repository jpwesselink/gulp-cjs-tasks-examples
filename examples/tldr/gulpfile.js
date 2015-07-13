var gulp = require('gulp'),
  gutil = require('gulp-util'),
  path = require('path');

// Get the task loader function
var taskLoader = require('gulp-cjs-tasks/task-loader');

// Prepare arguments for task loader
// Have a little configuration here...
var config = {
  you: {
    name: 'John Doe'
  }
};

// ... and some environment variables there...
var env = gutil.env;

// ... and sprinkle it with some nonsense.
var movieQuote = 'The light that burns twice as bright, burns half as long.';

// Tell the taskLoader where your task modules are,
// add the gulp argument, add as many other arguments as you like,
// these will be made available to the task modules.
var tasks = taskLoader.load(path.resolve(__dirname, 'tasks'), gulp, config, env,
  movieQuote);

// Add a gulp help task.
tasks
  .addHelpTask();

// Show the tasks that have been added
console.log('Added tasks:', tasks.taskNames.join(', '));

// Now show off your badassness and type gulp help
