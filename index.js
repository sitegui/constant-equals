'use strict'

/**
 * Check if two strings are equal, but in constant time!
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */
module.exports = function (a, b) {
	a = String(a)
	b = String(b)
	var len = Math.max(a.length, b.length),
		eq = true,
		i
	for (i = 0; i < len; i++) {
		if (a.length >= i && b.length >= i && a[i] !== b[i]) {
			eq = false
		}
	}
	return eq
}