'use strict';

var sane = require('./index');
var test = require('tape');

test('sane-object', function( t ){
	t.test('keys', function( t ){
		t.ok(sane({}, { keys: 0 }));
		t.notOk(sane({ a: '' }, { keys: 0 }));

		t.ok(sane({ a: { b: '' } }, { keys: 2 }));
		t.notOk(sane({ a: { b: '' } }, { keys: 1 }));

		t.ok(sane({ a: '', b: '' }, { keys: 2 }));
		t.notOk(sane({ a: '', b: '' }, { keys: 1 }));

		t.ok(sane([], { keys: 0 }));
		t.notOk(sane([''], { keys: 0 }));

		t.ok(sane(['', ''], { keys: 2 }));
		t.notOk(sane(['', ''], { keys: 1 }));

		t.ok(sane([['']], { keys: 2 }));
		t.notOk(sane([['']], { keys: 1 }));

		t.end();
	});

	t.test('depth', function( t ){
		t.ok(sane({}, { depth: 0 }));
		t.ok(sane({a: '', b: '' }, { depth: 0 }));
		t.notOk(sane({ a: { a: '' } }, { depth: 0 }));

		t.ok(sane({ a: { a: '' } }, { depth: 1 }));
		t.ok(sane({ a: { a: '' }, b: { b: '' } }, { depth: 1 }));

		t.ok(sane({ a: { a: { a: '' } } }, { depth: 2 }));

		t.ok(sane([], { depth: 0 }));
		t.ok(sane(['', ''], { depth: 0 }));
		t.notOk(sane([['']], { depth: 0 }));

		t.ok(sane([['']], { depth: 1 }));
		t.ok(sane([[''],['']], { depth: 1 }));
		t.ok(sane([[],[]], { depth: 1 }));

		t.end();
	});

	t.test('keyLength', function( t ){
		t.ok(sane({ a: { aa: { aaa: '' } } }, { keyLength: 3 }));
		t.notOk(sane({ a: { aa: { aaaa: '' } } }, { keyLength: 3 }));

		t.ok(sane([[['']]], { keyLength: 1 }));
		t.notOk(sane([[['']]], { keyLength: 0 }));

		t.end();
	});

	t.test('types', function( t ){
		t.ok(sane({ a: 1, b: '', c: true, d: null, e: undefined  }, { types: ['number', 'string', 'boolean', 'null', 'undefined'] }));
		t.notOk(sane({ a: 1, b: '', c: true, d: null, e: undefined  }, { types: ['number', 'string', 'boolean', 'null'] }));

		t.ok(sane([1, '', true, null, undefined], { types: ['number', 'string', 'boolean', 'null', 'undefined'] }));
		t.notOk(sane([1, '', true, null, undefined], { types: ['number', 'string', 'boolean', 'null'] }));

		t.end();
	});

	t.test('depth, keyLength, keys and types', function( t ){
		var foo = { a: { aa: { aaa: '' } }, b: 1, c: true, d: null, e: undefined };

		t.ok(sane(foo, { keys: 7, depth: 2, keyLength: 3, types: ['number', 'string', 'boolean', 'null', 'undefined'] }));
		t.notOk(sane(foo, { keys: 7, depth: 1, keyLength: 3, types: ['number', 'string', 'boolean', 'null', 'undefined'] }));
		t.notOk(sane(foo, { keys: 6, depth: 2, keyLength: 3, types: ['number', 'string', 'boolean', 'null', 'undefined'] }));
		t.notOk(sane(foo, { keys: 7, depth: 2, keyLength: 2, types: ['number', 'string', 'boolean', 'null', 'undefined'] }));
		t.notOk(sane(foo, { keys: 7, depth: 2, keyLength: 3, types: ['number', 'string', 'boolean', 'null'] }));
		t.notOk(sane(foo, { keys: 6, depth: 1, keyLength: 2, types: ['number', 'string', 'boolean', 'null'] }));

		foo = [[['']], 1, true, null, undefined];

		t.ok(sane(foo, { keys: 7, depth: 2, keyLength: 1, types: ['number', 'string', 'boolean', 'null', 'undefined'] }));
		t.notOk(sane(foo, { keys: 7, depth: 1, keyLength: 1, types: ['number', 'string', 'boolean', 'null', 'undefined'] }));
		t.notOk(sane(foo, { keys: 6, depth: 2, keyLength: 1, types: ['number', 'string', 'boolean', 'null', 'undefined'] }));
		t.notOk(sane(foo, { keys: 7, depth: 2, keyLength: 0, types: ['number', 'string', 'boolean', 'null', 'undefined'] }));
		t.notOk(sane(foo, { keys: 7, depth: 2, keyLength: 1, types: ['number', 'string', 'boolean', 'null'] }));
		t.notOk(sane(foo, { keys: 6, depth: 1, keyLength: 0, types: ['number', 'string', 'boolean', 'null'] }));

		t.end();
	});
});

