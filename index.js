'use strict';

module.exports = sane;

function sane(obj, params){
	var jobs = [obj];
	var rounds = 0;
	var counts = {
		jobs: jobs.length,
		keyLength: 0,
		types: {
			_number: false,
			_string: false,
			_boolean: false,
			_null: false,
			_undefined: false,
		},
	};
	var keys = Object.keys(counts.types);

	for (var i = 0, j = 1; i < counts.jobs; i++) {
		if (i === j) {
			j = counts.jobs;
			rounds++;
		}

		work(jobs, jobs[i], counts);

		if (insane(params, counts, rounds, keys))
			return false;
	}

	return true;
}

function work( jobs, subject, counts ){
	if (typeof subject === 'object' && subject) {
		var k = Object.keys(subject);

		for (var j = k.length - 1; j >= 0; j--) {
			jobs.push(subject[k[j]]);
			counts.jobs++;

			if (counts.keyLength < k[j].length)
				counts.keyLength = k[j].length;
		};
	}

	if (subject === null)
		counts.types._null = true;
	else
		counts.types['_' + typeof subject] = true;
}

function insane( params, counts, rounds, keys ){
	if (params.types !== undefined)
		for (var i = 0; i < keys.length; i++) {
			if (params.types.indexOf(keys[i].substr(1)) === -1 && counts.types[keys[i]])
				return true;
		};

	if (params.keyLength !== undefined && params.keyLength < counts.keyLength)
		return true;

	var depth = rounds - 1; // the bottom layer

	if (params.depth !== undefined && params.depth < depth)
		return true;

	var keys = counts.jobs - 1; // the first job

	if (params.keys !== undefined && params.keys < keys)
		return true;
}
