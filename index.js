'use strict'

/**
 * Check if two strings are equal, but in constant time!
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */
module.exports = function (a, b) {
	var eq = true,
		i, len

	if (Array.isArray(a) && Array.isArray(b)) {
		// Check each element of the array
		len = Math.max(a.length, b.length)
		for (i = 0; i < len; i++) {
			if (a.length >= i && b.length >= i && !module.exports(a[i], b[i])) {
				eq = false
			}
		}
	} else if (typeof a === 'string' && typeof b === 'string') {
		// Check each char of the string
		len = Math.max(a.length, b.length)
		for (i = 0; i < len; i++) {
			if (a.length >= i && b.length >= i && a[i] !== b[i]) {
				eq = false
			}
		}
	} else {
		// Fallback to ===
		eq = a === b
	}

	return eq
}