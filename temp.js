'use strict';

var sane = require('./index');

var company = {
	contacts: [
		{
			name: 'Blanca Benson',
			phone: {
				home: '+1 (850) 515-3813'
			},
			address: [
				{
					home: '661 Congress Street - Wanship - Northern Mariana Islands 717',
				}
			]
		}
	],
	company: {
		name: 'SOPRANO',
		address: {
			office: '754 Furman Street - Sehili - Oregon 319',
		}
	}
};


console.log(sane(company, { keys: 12, depth: 4 })); // true
console.log(sane(company, { keys: 4, depth: 4 })); // false
console.log(sane(company, { keys: 12, depth: 3 })); // false


