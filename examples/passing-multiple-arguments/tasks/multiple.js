module.exports = function(gulp, foo, bar) {
	var tasks = {
		'multiple': function() {
			console.log('second argument', foo);
			console.log('third argument', bar);
		}
	};

	return tasks;
};
