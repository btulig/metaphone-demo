exports.write = (arr) => {
	arr.forEach(element => {
		console.log(element.name + ' | ' + element.encodedName +  ' | ' + element.distance)
	});
}