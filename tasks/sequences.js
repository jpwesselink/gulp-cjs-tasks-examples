module.exports = function(gulp) {
  return {
    one: {
      fn: one,
      help: 'Task one'
    },
    two: {
      fn: two,
      help: 'Task two'
    },
    three: {
      fn: three,
      help: 'Task three'
    },
    four: {
      fn: four,
      help: 'Task four'
    },
    'one-then-two': {
      seq: ['one', 'two'],
      help: 'Tasks one then two'
    },
    'one-and-two-then-three': {
      seq: [
        ['one', 'two'], 'three'
      ],
      help: 'Tasks one and two then three'
    },
    'one-and-two': {
      seq: [
        ['one', 'two']
      ],
      help: 'Tasks one and two'
    },
    'one-and-two-then-three-and-four': {
      seq: [
        ['one', 'two'],
        ['three', 'four']
      ],
      help: 'Tasks one and two then three and four'
    }
  };

  function one(done) {
    setTimeout(function() {
      console.log('task one done');
      done();
    }, 500);
  }

  function two(done) {
    setTimeout(function() {
      console.log('task two done');
      done();
    }, 500);
  }

  function three(done) {
    setTimeout(function() {
      console.log('task three done');
      done();
    }, 500);
  }

  function four(done) {
    setTimeout(function() {
      console.log('task four done');
      done();
    }, 500);
  }
};
