/*globals describe, it*/
'use strict'

var eq = require('../')

require('should')

describe('constantEquals', function () {
	it('should behave like === for strings', function () {
		eq('', '').should.be.true()
		eq('a-string', 'a-string').should.be.true()

		eq('a-string', '').should.be.false()
		eq('a-string', 'another-string').should.be.false()
		eq('almost equal strings', 'aimost equal strings').should.be.false()
	})

	it('should apply to arrays', function () {
		eq(['a', 'array', 'of', 5, 'tags'], ['a', 'array', 'of', 5, 'tags']).should.be.true()
		eq(['a', 'array', 'of', 5, 'tags'], ['a', 'array', 'of', '5', 'tags']).should.be.false()
		eq(['a', 'array', 'of', 5, 'tags'], ['a', 'arrai', 'of', 5, 'tags']).should.be.false()

		eq([1, 2, 3], [1, 2]).should.be.false()

		eq([
			[3, 14],
			[15, 92]
		], [
			[3, 14],
			[15, 92]
		]).should.be.true()
		eq([
			[3, 14],
			[15, 92]
		], [
			[3, 15],
			[14, 92]
		]).should.be.false()
	})

	it('should behave like === for other types', function () {
		eq(17, 17).should.be.true()
		eq('17', 17).should.be.false()
		eq({}, {}).should.be.false()
		eq(eq, eq).should.be.true()
	})

	it('should execute in constant time', function () {
		this.timeout(60e3)
		var n = 1e5,
			m = 100,
			str1 = 'should execute in constant time',
			str2 = 'should also be in constant time',
			str3 = 'should execute in constant timi',
			dt12 = stat(str1, str2, n, m),
			dt13 = stat(str1, str3, n, m)
		dt12.should.be.approximately(dt13, (dt12 + dt13) / 10) // TODO: find a better statistical test
	})
})

function time(a, b, n) {
	var then = Date.now()
	for (var i = 0; i < n; i++) {
		eq(a, b)
	}
	return (Date.now() - then) * 1e6 / n
}

function stat(a, b, n, m) {
	var times = []
	for (var i = 0; i < m; i++) {
		times.push(time(a, b, n))
	}
	times.sort(function (a, b) {
		return a - b
	})
	return times[Math.floor(times.length / 2)]
}