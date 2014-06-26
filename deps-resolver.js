var fs = require('fs');
var path = require("path");

var mojoDir = path.join(__dirname, 'javascript/mojo/js/source/');

function getFilePathByMojoClassName(className) {
	var nameComponents = className.split(".");
	var dir = mojoDir;

	nameComponents.forEach(function(component){
		if (component === 'mstrmojo') return;

		dir = path.join(dir, component);
	});

	return dir + '.js';
}

function getClassNamesArrayFromSourceFile(text) {
	text = String(text).split('\n').join('');
	var reg = /mstrmojo\.requiresCls\s*\(\s*([^)]*)\)/m;
	var matched = text.match(reg);
	var classes = [];
	if (matched && matched[1]) {
		classes = matched[1].split(/\s*,\s*/);
		classes = classes.map(function(className){
		  //elimite the quotes and white spaces
		  return className.replace(/'|"/g, '').trim();;
		});
	}
	return classes;
}

function getDepsArrayFromClassNames(classNames) {
	if (typeof classNames === 'string') {
		classNames = [classNames];
	}

	var deps = [];
	var marked = {};

	function getDepsArray(className) {
		var file_path = getFilePathByMojoClassName(className);
		if (!fs.existsSync(file_path)) return [];

		var content = fs.readFileSync(file_path);
		var deps = getClassNamesArrayFromSourceFile(content);

		//walk through the deps
		while (1) {
			var i = 0;
			while(deps[i] && marked[deps[i]]) {
				i++;
			}

			var depClassName = deps[i];
			if (depClassName) {
				marked[depClassName] = true;
				[].splice.apply(deps, [i, 0].concat(getDepsArray(depClassName)));
			} else {
				break;
			}
		}

		return deps;
	}

	classNames.forEach(function(className){
		deps = deps.concat(getDepsArray(className));
	});

	// remove duplicates
	return deps.filter(function(dep, idx){
		return deps.indexOf(dep) === idx;
	});
}

module.exports = {
	getDepsArrayFromClassNames: getDepsArrayFromClassNames,
	getFilePathByMojoClassName: getFilePathByMojoClassName,
	getClassNamesArrayFromSourceFile: getClassNamesArrayFromSourceFile
};