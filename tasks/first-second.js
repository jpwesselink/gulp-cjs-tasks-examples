module.exports = {
	first: first,
	second: {
		fn: second,
		dep: ['first']
	}
};

function first(done) {
	console.log('first!');
	done();
}

function second(done) {
	console.log('second!');
	done();
}
