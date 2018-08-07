// Fuzzy Text Searching in JavaScript!
// Fuzzy Text Searching in JavaScript!
// Fuzzy Text Searching in JavaScript!
// 8/7/2018
// Brad Tulig

var prompt = require('./node_modules/prompt');
var writer = require('./resultsWriter');
var m = metaphone = require('./node_modules/metaphone');
var dm = doubleMetaphone = require('./node_modules/double-metaphone');
var editDistance = require('./node_modules/levenshtein-edit-distance');
var encoder = require('./encoder');
var names = require('./names');

// Promptjs setup
var schema = {
	properties: {
		name: {
			pattern: /^[a-zA-Z\s]+$/,
			message: 'Name must be only letters or spaces',
			required: true
		}
	}
};

prompt.start();
// 111111111111111111111111111111111111111
// A typical name search in T-SQL:
//Select * from employee where
//	fname like 'bob%' and lname like 'smith%'
////////////////////////////////////////////////////////////////////////////////////////////////

// 222222222222222222222222222222222222222
// IN code
// prompt.get(schema, (err, result) => {
// 	console.log(names.names.filter(name => name.toLowerCase().indexOf(result.name.toLowerCase()) > -1));
// });
// John vs Jon - you can't get there from here.
///////////////////////////////////////////////////////////////////////////////////////////////

// 3333333333333333333333333333333333333333
// Metaphone & Double Metaphone
// var name = 'John';
// var another = 'Brad';
// console.log('Encoded strings into metaphone'd strings');
// console.log(m(name), m(another));
// console.log(dm(name)[0], dm(another)[0]);
///////////////////////////////////////////////////////////////////////////////////////////////


// 4444444444444444444444444444444444444444
// Metaphone & Double Metaphone
// var name = 'John';
// var another = 'Jon Weber';
// console.log(m(name), m(another));
// console.log(dm(name)[0], dm(another)[0]);
// // // is it good.....
// console.log('IndexOf with metaphone'd names and metaphone'd search key:');
// console.log(encoder.encode(names.names, m).filter(item => item.encodedName.indexOf(m(name)) > -1));
///////////////



// Sort of
// console.log('I am looking for a guy named John Weber.  I think that is his name...');
// var search = 'John Weber';
// var search = 'John';
// console.log(`Index of Search using ${search}:`)
// console.log(names.names.filter(item => item.indexOf(search) > -1));
// console.log('IndexOf results encoded:')
// console.log(encoder.encode(names.names.filter(item => item.indexOf(search) > -1), dm, true));
// console.log('Let\'s use indexOf with the keyed name string.  Is that better?');
// console.log(`Metaphoned Name: ${m(search)}`);
// console.log(encoder.encode(names.names, m, false).filter(item => item.encodedName.indexOf(m(search)) > -1));



// I'm actually looking for Yohan Weber.... where is he?
/////////////////////////////////////////////////////////////////////////////////////////////////

// 5555555555555555555555555555555555
// Levinshtein Edit Distance
//  How many edits are required to make the search terms match?
// JNSM0 vs JNKSM0
// 'John Weber' vs 'Yohan Weber'
// console.log('How different are these two spellings:');
// console.log(m('John Weber'), m('Yohan Weber'));
// console.log(editDistance(m('John Weber'), m('Yohan Weber')));


// 66666666666666666666666666666666666
// Metaphone + Edit Distances
// "I have no idea how to spell the word I'm looking for..."
// var name = 'renalda righf';
// var name = 'John Weber';

// var testName = dm(name)[0];
// var en = encoder.encode(names.names, dm, true);
// en.forEach(element => {
// 	console.log(testName, ' | ', element.name, element.encodedName, ' | ', editDistance(testName, element.encodedName));
// });
///////////////////////////////////////////////////////////////////////////////////////////

//****************************/
//* FINAL "SOLUTION" *
//****************************/

// prompt.get(schema, function (err, result) {
// 	var testName = dm(result.name)[0];
// 	var ranked = encoder.ranker(encoder.distancizer(testName, encoder.encode(names.names, dm, true)));

// 	// writer.write(ranked);
// 	writer.write(encoder.top(ranked, 15));
// });
