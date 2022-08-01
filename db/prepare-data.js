import fs from 'fs';
import glob from 'glob';

const DEBUG = false;

// run in the directory containing the xml files
const globPromise = function (pattern, options) {
	return new Promise((resolve, reject) => {
		glob(pattern, options, (err, files) =>
			err === null ? resolve(files) : reject(err)
		);
	});
};

const files = await globPromise(
	DEBUG ? './authors1.mods.json' : './*.mods.json'
);

const allData = files.map((file) => {
	console.log(`reading ${file}`);

	let rawData = fs.readFileSync(file).toString();

	// remove characters that require [] addressing
	rawData = rawData.replaceAll('#text', 'text');
	rawData = rawData.replaceAll('@authority', 'authority');
	rawData = rawData.replaceAll('@type', 'type');

	const data = JSON.parse(rawData);

	console.log(`found ${data.items.mods.length} items in ${file}`);
	return data.items.mods.map(parseEntry);
});

fs.writeFileSync('harvard.data.json', JSON.stringify(allData.flat(), null, 3));

function cleanString(s) {
	if (!s || (typeof s !== 'string') | (s.length === 0)) return '';
	return s
		.replaceAll(/[!@#$%^&*,.:;<=>?_]$/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

function parseEntry(item, i) {
	if (DEBUG && i > 5) return;

	let entry = {};

	// the title is in the array entry without a type
	const titleInfo = Array.isArray(item.titleInfo)
		? item.titleInfo.find((ti) => !ti.type)
		: item.titleInfo;

	entry.title = cleanString(
		`${cleanString(titleInfo.nonSort)} ${cleanString(titleInfo.title)}`
	);
	entry.subtitle = cleanString(titleInfo.subTitle);

	const authors = Array.isArray(item.name)
		? item.name.map(extractAuthorData)
		: item.name && item.name.namePart // name not an array
		? [extractAuthorData(item.name)]
		: [];
	// remove empty objects
	entry.authors = authors.filter((el) => Object.keys(el).length > 0);

	entry.lcCallNumber = cleanString(
		extractClassification(item.classification, 'lcc')
	);

	entry.ddCallNumber = cleanString(
		extractClassification(item.classification, 'ddc')
	);

	entry.isbn = cleanString(extractIdentifier(item.identifier, 'isbn'));

	entry.abstract = item.abstract ? cleanString(item.abstract.text) : '';

	const rawSubjects = Array.isArray(item.subject)
		? item.subject.filter(
				(su) =>
					su.topic &&
					su.authority &&
					'lcsh | fast'.includes(su.authority.toLowerCase())
		  )
		: [item.subject];
	entry.subjects = extractSubjects(rawSubjects);

	entry.publisherName = cleanString(
		getOriginKey(item.originInfo, 'publisher')
	);

	entry.publishedDate = cleanString(
		getOriginKey(item.originInfo, 'dateIssued')
	);

	return entry;
}

function extractSubjects(rawSubjects) {
	return rawSubjects.map((sh) => {
		if (!sh) return [];
		// must have topic to be included
		let subject = cleanString(
			Array.isArray(sh.topic) ? sh.topic.join(' — ') : sh.topic
		).replaceAll('—', ' — ');
		// add genre if present
		if (sh.genre)
			subject = `${subject}${subject.length > 0 ? ' — ' : ''}${cleanString(
				sh.genre
			)}`;
		// add geographic if present
		if (sh.geographic)
			subject = `${subject}${subject.length > 0 ? ' — ' : ''}${cleanString(
				sh.geographic
			)}`;
		// add temporal if present
		if (sh.temporal)
			subject = `${subject}${subject.length > 0 ? ' — ' : ''}${cleanString(
				sh.temporal
			)}`;
		return cleanString(subject);
	});
}

function extractAuthorData(name) {
	const authorName = extractAuthorName(name.namePart);
	return /\w+/.test(authorName)
		? {
				authorName: cleanString(authorName),
				roleTerm: cleanString(extractAuthorRoleTerm(name.role)),
		  }
		: {};
}

function extractAuthorName(namePart) {
	return Array.isArray(namePart)
		? namePart.find((np) => typeof np === 'string')
		: namePart;
}

function extractAuthorRoleTerm(role) {
	const roleInfo = Array.isArray(role)
		? role.find((r) => r.roleTerm.type.toLowerCase() === 'text')
		: role && role.roleTerm
		? role.roleTerm
		: null;
	return roleInfo ? roleInfo.text : '';
}

function extractClassification(classification, type) {
	if (!classification) return '';
	const clToUse = Array.isArray(classification)
		? classification.find(
				(cl) => cl.authority && cl.authority.toLowerCase() === type
		  )
		: classification.authority &&
		  classification.authority.toLowerCase() === type
		? classification
		: null;

	return clToUse ? clToUse.text : '';
}

function extractIdentifier(identifier, type) {
	if (!identifier) return '';
	const idToUse = Array.isArray(identifier)
		? identifier.find((id) => id.type && id.type.toLowerCase() === type)
		: identifier.type && identifier.type.toLowerCase() === type
		? identifier
		: null;

	return idToUse ? idToUse.text : '';
}

function getOriginKey(origin, key) {
	if (!origin) return '';

	const originToUse = Array.isArray(origin)
		? origin.find(
				(orig) =>
					orig[key] &&
					typeof orig[key] === 'string' &&
					/\w+/.test(orig[key])
		  )
		: origin;

	return originToUse
		? Array.isArray(originToUse[key])
			? originToUse[key][0]
			: originToUse[key]
		: '';
}
