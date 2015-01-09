'use strict';

module.exports = sane;

function sane(obj, params){
	var jobs = [obj];
	var rounds = 0;
	var counts = {
		jobs: jobs.length,
	};

	for (var i = 0, j = 1; i < counts.jobs; i++) {
		if (i === j) {
			j = counts.jobs;
			rounds++;
		}

		work(jobs, jobs[i], counts);

		if (insane(params, counts.jobs, rounds))
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
		};
	}
}

function insane( params, jobs, rounds ){
	var depth = rounds - 1; // the bottom layer

	if (params.depth !== undefined && params.depth < depth)
		return true;

	var keys = jobs - 1; // the first job

	if (params.keys !== undefined && params.keys < keys)
		return true;
}
