var Q = require('q');

module.exports = function(gulp) {

	return {
		'promised': {
			fn: promisedTask,
			description: 'Just a task which returns a promise'
		}
	};

	function promisedTask() {

		console.log('promised task starts');

		var deferred = Q.defer();

		setTimeout(function() {

			console.log('a task with a promise');
			deferred.resolve();

		}, 2000);

		console.log('promised task returns');

		return deferred.promise;
	}
};
