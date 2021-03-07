const borders = require('./data/borders.json');

exports.borders = borders;

function makeSortFn(originalDirectionData) {
	const borderingSort = (a, b) => {
		var aDirData = getDirectionFromOrigin(a);
		var bDirData = getDirectionFromOrigin(b);

		var aDirMatch, bDirMatch;
		if (aDirData.latDir === originalDirectionData.latDir &&
		    aDirData.longDir === originalDirectionData.longDir) {
			aDirMatch = 4;
		} else if (aDirData.latDir === originalDirectionData.latDir ||
		           aDirData.longDir === originalDirectionData.longDir) {
			aDirMatch = 2;
		} else {
			aDirMatch = 0;
		}

		if (bDirData.latDir === originalDirectionData.latDir &&
		    bDirData.longDir === originalDirectionData.longDir) {
			bDirMatch = 4;
		} else if (bDirData.latDir === originalDirectionData.latDir ||
		           bDirData.longDir === originalDirectionData.longDir) {
			bDirMatch = 2;
		} else {
			bDirMatch = 0;
		}

		var aDeltaAngle = Math.abs(originalDirectionData.angle - aDirData.angle);
		var bDeltaAngle = Math.abs(originalDirectionData.angle - bDirData.angle);

		if (aDirMatch === bDirMatch) {
			return aDeltaAngle < bDeltaAngle ? -1 : 1;
		} else {
			return aDirMatch < bDirMatch ? -1 : 1;
		}

	}

	return borderingSort;
}

exports.makeSortFn = makeSortFn;
