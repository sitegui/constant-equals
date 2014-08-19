'use strict'

var crypto = require('crypto'),
	a = getRandomString(1000),
	similarity, b, t, ct

console.log(['% simi', 'avg ct=', 'avg ===', 'md ct=', 'md ==='].join('\t'))
for (similarity = 0; similarity <= 100; similarity += 2) {
	b = getSimiliarString(a, similarity / 100)
	t = stat(function () {
		return compare(a, b, 1e5)
	}, 100)
	ct = stat(function () {
		return constantCompare(a, b, 1e3)
	}, 100)
	console.log([similarity, ct.avg, t.avg, ct.median, t.median].join('\t'))
}

/**
 * @param {number} length
 * @returns {string}
 */
function getRandomString(length) {
	return crypto.pseudoRandomBytes(Math.ceil(3 * length / 4)).toString('base64').substr(0, length)
}

/**
 * Generate another string that has the same prefix and length as another one
 * @param {string} base
 * @param {number} relation A number from 0 (not equal at all) to 1 (equal strings)
 * @param {string}
 */
function getSimiliarString(base, relation) {
	var length = Math.round(base.length * relation),
		r = '',
		i, str
	do {
		str = getRandomString(base.length - length)
	} while (str && str[0] === base[length])
	for (i = 0; i < length; i++) {
		r += base[i] // substr(...) seems to be optimized
	}
	return r + str
}

/**
 * Compute a==b n times
 * @param {string} a
 * @param {string} b
 * @param {number} n
 * @returns {number} The time per comparison (in ns)
 */
function compare(a, b, n) {
	var n2 = n,
		then = Date.now()
	while (n2--) {
		a === b
	}
	return (Date.now() - then) * 1e6 / n
}

/**
 * Compute a==b n times with a constant algorithm
 * @param {string} a
 * @param {string} b
 * @param {number} n
 * @returns {number} The time per comparison (in ns)
 */
function constantCompare(a, b, n) {
	var n2 = n,
		then = Date.now(),
		eq = false,
		len, i
	while (n2--) {
		len = Math.max(a.length, b.length)
		for (i = 0; i < len; i++) {
			if (a.length >= i && b.length >= i && a[i] !== b[i]) {
				eq = false
			}
		}
	}
	return (Date.now() - then) * 1e6 / n
}

/**
 * Make a statistical experiment on fn
 * @param {Function} fn A function that receives nothing and returns a number
 * @param {number} n Number of probes to takes
 * @returns {{avg: number, median: number}}
 */
function stat(fn, n) {
	var n2 = n,
		times = [],
		sum = 0,
		t, avg, median
	while (n2--) {
		t = fn()
		sum += t
		times.push(t)
	}
	avg = sum / n
	times.sort(function (a, b) {
		return a - b
	})
	median = times[Math.floor(times.length / 2)]
	if (times.length % 2 === 0) {
		median = (median + times[times.length / 2 - 1]) / 2
	}
	return {
		avg: avg,
		median: median
	}
}