var lev = require('./node_modules/levenshtein-edit-distance');

exports.encode = (arr, encoderFn, hasSecondaryEncoding) => {
	var encodedArray = [];

	arr.forEach(element => {
		// this implementation of double metaphone always returns both encodings
		if (hasSecondaryEncoding) {
			encodedArray.push({
				name: element,
				encodedName: encoderFn(element.toLowerCase())[0]
			})
		}
		else {
			encodedArray.push({
				name: element,
				encodedName: encoderFn(element.toLowerCase())
			})
		}

	});

	return encodedArray;
};

/**
 * Applies the edit distance compared to the search term and sorts the result by the encoded name
 * @param {string} searchTerm
 * @param {*} arr
 */
exports.distancizer = (searchTerm, arr) => {
	arr.forEach(item => {
		var l = lev(searchTerm, item.encodedName);
		if (l === 0) {
			item.distance = 0;
		} else {
			item.distance = l;
		}

	});
	var sortFn = (a, b) => {
		let comparison = 0;
		if (a.encodedName > b.encodedName) {
			comparison = -1;
		} else {
			comparison = -0;
		}
		return comparison;
	};

	return arr.sort(sortFn);
}

/**
 * Sort an array by rank
 * @param {Array} unrankedArray An array of objects that have a ranking assigned to them
 */
exports.ranker = (unrankedArray) => {
	var rankedResults = [];

	var sortFn = (a, b) => {
		let comparison = 0;
		if (a.distance > b.distance) {
			comparison = 1;
		} else {
			comparison = -1;
		}
		return comparison;
	}

	rankedResults =	unrankedArray.sort(sortFn);

	return rankedResults;
}

/**
 * Take the top X items from an array
 * @param {Array} arr an array of items to get the top of
 * @param {int} maxReturned The max number of items to return
 */
exports.top = (arr, maxReturned) => {
	var max = maxReturned || 10;
	var ret = [];

	if (arr.length === 0) return [];
	if (arr.length < max) max = arr.length;

	for (let i = 0; i <= max; i++){
		ret.push(arr[i]);
	}

	return ret;
}