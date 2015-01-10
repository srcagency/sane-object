# sane-object

Validates an object against a list of parameters:
- keys: max number of total keys in object (and nested objects)
- depth: max depth in the object
- keyLength: max number of characters in a key (or nested object keys)

## Installation

```shell
$ npm install sane-object
```

## API

```javascript
var sane = require('sane-object');

var company = {
	contacts: [
		{
			name: 'Blanca Benson',
			phone: {
				home: '+1 (850) 515-3813'
			},
			address: [
				{
					home: '661 Congress Street',
				}
			]
		}
	],
	company: {
		name: 'SOPRANO',
		address: {
			office: '754 Furman Street',
		}
	}
};

sane(company, { keys: 12, depth: 4, keyLength: 8 }); // true
sane(company, { keys: 4, depth: 4, keyLength: 8 }); // false
sane(company, { keys: 12, depth: 3, keyLength: 8 }); // false
sane(company, { keys: 12, depth: 4, keyLength: 7 }); // false

```

## License

[MIT](http://opensource.org/licenses/MIT) © René Nielsen & Thomas Jensen @ [src.agency](http://src.agency)
