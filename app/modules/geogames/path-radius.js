const { borders, makeSortFn } = require('./helpers');


const MAX_DEPTH = 30;

function notAlreadyInPaths(depthPaths, country) {
	var result = true;
	var search = `"${country}"`;
	result = depthPaths.indexOf(search) === -1;
	return result;
}

function getBorders(currentCountry) {
	var countryData = borders.find(b => b.country === currentCountry) || [];
	return countryData.borders;
}

function pathRadius(origin, destination, skip = 'omitted') {
	var paths = [[origin]];
	var reachedDest = false;
	var found = [];
	for (depth = 0; !reachedDest && depth < MAX_DEPTH; depth++) {
		console.log('Depth', depth);
		var depthPaths = JSON.stringify(paths);
		for (let i = 0, j = paths.length; i < j; i++){
			let p = paths[i];
			var country = p[p.length - 1];

			var bordering = getBorders(country);
			bordering = bordering.filter(c => c !== skip);
			let pathStub = paths[i].slice(0);
			for (let j = 0; j < bordering.length; j++) {
				// Add only if this country isn't in the path already.
				if (pathStub.indexOf(bordering[j]) === -1) {
					if (notAlreadyInPaths(depthPaths, bordering[j])) {
						if (j === 0) paths[i].push(bordering[j]);
						else paths.push(pathStub.concat(bordering[j]));
					}
				}
				if (bordering[j] === destination) reachedDest = true;
			}
		}
		paths = paths.filter(p => p.length === depth + 2);
		paths.sort((a, b) => { let strA = a.join('.'), strB = b.join('.'); return strA < strB ? -1 : 1; });
	}

	if (reachedDest) {
		found = paths.filter(p => p.indexOf(destination) !== -1);
	}

	return { reachedDest, found };
}

exports.pathRadius = pathRadius;
