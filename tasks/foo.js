module.exports = function() {
	return function(done) {
		console.log('foo!');
		done();
	};
};
