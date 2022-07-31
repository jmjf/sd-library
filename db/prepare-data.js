import fs from 'fs';
import xml2js from 'xml2js';
import glob from 'glob';

// run in the directory containing the xml files
const globPromise = function (pattern, options) {
	return new Promise((resolve, reject) => {
		glob(pattern, options, (err, files) =>
			err === null ? resolve(files) : reject(err)
		);
	});
};

const files = await globPromise('./*.xml');

const xmlPromises = files.map((file) => {
	console.log(`processing ${file}`);

	const xml = fs.readFileSync(file);

	const fileData = xml2js.parseStringPromise(xml).then((parsedXml) => {
		console.log('parsed xml');
		const items = parsedXml.results.items[0]['mods:mods'];
		const data = items.map(parseEntry);
		return data;
	});

	// fs.writeFileSync(`${file}.json`, JSON.stringify(fileData, null, 3));
	return fileData;
});
const allData = await Promise.all(xmlPromises);
console.log('allData', allData);
fs.writeFileSync('harvard.json', JSON.stringify(allData.flat(), null, 3));

function cleanString(s) {
	if (!s || (typeof s !== 'string') | (s.length === 0)) return '';
	const cleaner = /[^a-zA-Z0-9]+$|^[^a-zA-Z0-9]+/g;
	return s.replaceAll(cleaner, '').replace(/\s+/g, ' ');
}

function parseEntry(item) {
	let entry = {};

	const titleInfo = item['mods:titleInfo'][0];
	entry.title = cleanString(
		`${titleInfo['mods:nonSort'] ? titleInfo['mods:nonSort'][0] : ''} ${
			titleInfo['mods:title'][0]
		}`
	);
	entry.subtitle = cleanString(
		titleInfo['mods:subTitle']
			? titleInfo['mods:subTitle'][0].trim().replace(/  +/g, ' ')
			: ''
	);
	// replace strings of >1 whitespace with space

	entry.authors = item['mods:name']
		? item['mods:name'].map((nm) => {
				return {
					name: cleanString(nm['mods:namePart'][0].toString()),
					roleTerm: nm['mods:role']
						? cleanString(nm['mods:role'][0]['mods:roleTerm'][0]['_'])
						: '',
				};
		  })
		: [];

	const classificationInfo = item['mods:classification']
		? item['mods:classification']
		: [];
	const lcInfo = classificationInfo.find((ci) => ci['$'].authority === 'lcc');
	entry.lcCallNumber = lcInfo ? cleanString(lcInfo['_']) : '';

	const ddInfo = classificationInfo.find((ci) => ci['$'].authority === 'ddc');

	entry.ddCallNumber = ddInfo ? cleanString(ddInfo['_']) : '';

	const isbnInfo = item['mods:identifier']
		? item['mods:identifier'].find((ii) => ii['$'] && ii['$'].type === 'isbn')
		: null;
	entry.isbn = isbnInfo ? cleanString(isbnInfo['_']) : '';

	entry.abstract = item['mods:abstract']
		? cleanString(item['mods:abstract'][0]['_'])
		: '';
	entry.genres = !item['mods:genre']
		? []
		: [
				...new Set( // dedupe the array
					item['mods:genre']
						.filter(
							(gn) =>
								!gn['_']
									? ''
									: /[A-Z]/.test(gn['_'][0]) && // first char is capital letter
									  /[A-Z]/i.test(gn['_'][gn['_'].length - 1]) // last char is a letter (case insensitive)
						)
						.map((gn) => cleanString(gn['_']))
				),
		  ];

	// originInfo may have many entries, some may not have publishers
	// find the first entry with a publisher and use that publisher
	// if that entry has a dateIssued, use it, otherwise use date from dateIssued[0]

	entry.publisher = item['mods:originInfo'][0]['mods:publisher']
		? cleanString(item['mods:originInfo'][0]['mods:publisher'][0])
		: '';
	entry.publishedDate = item['mods:originInfo'][0]['mods:dateIssued']
		? cleanString(
				item['mods:originInfo'][0]['mods:dateIssued'][0]['_'] ||
					item['mods:originInfo'][0]['mods:dateIssued'][0]
		  )
		: '';

	// language -- item['mods:language'][0]['mods:languageTerm'] map to get array of ['_']; reduce to get longest element
	// toc -- item['mods:tableOfContents].join(' | ')
	//console.log(entry);
	return entry;
}
// return result;
// 	});
// })
