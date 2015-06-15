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
