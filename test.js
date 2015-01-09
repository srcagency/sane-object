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

	t.test('depth and keys', function( t ){
		t.ok(sane({ a: { aa: { aaa: '' } } }, { keys: 3, depth: 2 }));
		t.notOk(sane({ a: { aa: { aaa: '' } } }, { keys: 3, depth: 1 }));
		t.notOk(sane({ a: { aa: { aaa: '' } } }, { keys: 2, depth: 2 }));
		t.notOk(sane({ a: { aa: { aaa: '' } } }, { keys: 2, depth: 1 }));

		t.ok(sane([[['']]], { keys: 3, depth: 2 }));
		t.notOk(sane([[['']]], { keys: 3, depth: 1 }));
		t.notOk(sane([[['']]], { keys: 2, depth: 2 }));
		t.notOk(sane([[['']]], { keys: 2, depth: 1 }));

		t.end();
	});
});

