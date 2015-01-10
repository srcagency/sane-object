'use strict';

module.exports = sane;

function sane(obj, params){
	var jobs = [obj];
	var rounds = 0;
	var counts = {
		jobs: jobs.length,
		keyLength: 0,
	};

	for (var i = 0, j = 1; i < counts.jobs; i++) {
		if (i === j) {
			j = counts.jobs;
			rounds++;
		}

		work(jobs, jobs[i], counts);

		if (insane(params, counts, rounds))
			return false;
	}

	return true;
}

function work( jobs, subject, counts ){
	if (typeof subject === 'object') {
		var k = Object.keys(subject);

		for (var j = k.length - 1; j >= 0; j--) {
			jobs.push(subject[k[j]]);
			counts.jobs++;

			if (counts.keyLength < k[j].length)
				counts.keyLength = k[j].length;
		};
	}
}

function insane( params, counts, rounds ){
	if (params.keyLength !== undefined && params.keyLength < counts.keyLength)
		return true;

	var depth = rounds - 1; // the bottom layer

	if (params.depth !== undefined && params.depth < depth)
		return true;

	var keys = counts.jobs - 1; // the first job

	if (params.keys !== undefined && params.keys < keys)
		return true;
}
