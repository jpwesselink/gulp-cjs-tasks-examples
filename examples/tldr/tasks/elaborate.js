module.exports = function(gulp, config, env, movieQuote) {

	var Q = require('q');

	var tasks = {
		'simple': {
			fn: simpleTask,
			description: 'A very simple task'
		},
		'important': {
			fn: importantTask,
			description: 'The most important task',
			// the help task priority is set to 100
			priority: 1000
		},
		'sequence': {
			fn: afterSequence,
			seq: [
				['sequence-1-a', 'sequence-1-b'],
				['sequence-2-a', 'sequence-2-b']
			],
			description: 'A sequence of tasks'
		},
		'sequence-1-a': {
			fn: sequence1a,
			description: 'Task with timeout of 2000 ms'
		},
		'sequence-1-b': {
			fn: sequence1b,
			description: 'Task with timeout of 100 ms'
		},
		'sequence-2-a': {
			fn: sequence2a,
			description: 'Task without timeout'
		},
		'sequence-2-b': {
			fn: sequence2b,
			description: 'Task without timeout'
		}
	};

	return tasks;

	function simpleTask() {
		console.log('Executing a simple task');
	}

	function importantTask() {
		console.log('Executing an important task');
	}

	// sequence
	function afterSequence(done) {
		console.log('afterSequence');
		done();
	}

	function sequence1a(done) {
		setTimeout(function() {
			console.log('1-a');
			done();
		}, 2000);
	}

	function sequence2a(done) {
		console.log('2-a');
		done();
	}

	function sequence1b(done) {
		setTimeout(function() {

			console.log('1-b');
			done();
		}, 100);
	}

	function sequence2b(done) {
		console.log('2-b');
		done();
	}
}
