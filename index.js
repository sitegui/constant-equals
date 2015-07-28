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

/**
 * Find the index of a string in an array, in constant time
 * @param {Array<string>} arr
 * @param {string} str
 * @returns {number}
 */
module.exports.indexOf = function (arr, str) {
	var index = -1,
		len = arr.length,
		i

	// Check each element of the array
	// Do this in reverse order to get the least index
	for (i = len - 1; i >= 0; i--) {
		if (module.exports(arr[i], str)) {
			index = i
		}
	}

	return index
}

/**
 * Find the last index of a string in an array, in constant time
 * @param {Array<string>} arr
 * @param {string} str
 * @returns {number}
 */
module.exports.lastIndexOf = function (arr, str) {
	var index = -1,
		len = arr.length,
		i

	// Check each element of the array
	// Do this in direct order to get the greatest index
	for (i = 0; i < len; i++) {
		if (module.exports(arr[i], str)) {
			index = i
		}
	}

	return index
}