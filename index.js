var express = require("express");
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var resolver = require("./deps-resolver");
var app = express();

app.use(bodyParser());


function wrapMojoDeps(htmlContent) {
	var allClassNames = resolver.getClassNamesArrayFromSourceFile(htmlContent);
	var deps = resolver.getDepsArrayFromClassNames(allClassNames);

	deps = deps.concat(allClassNames);
	var scripts = deps.map(function(dep){
		var p = resolver.getFilePathByMojoClassName(dep);
		p = '/' + path.relative(__dirname, p).replace(/\\/g, '/');
		return "<script src='" + p + "'></script>"
	});
	scripts.unshift("<script src='/javascript/mojo/js/source/mstrmojo.js'></script>");
	return htmlContent.replace("</head>", scripts.join('\n') + "\n</head>");
}


/* serves main page */
app.get("/", function(req, res) {
	var indexContent = String(fs.readFileSync(path.join(__dirname, 'index.html')));

	res.send(wrapMojoDeps(indexContent));
});

app.get(/\/(.*.html)$/, function(req, res){
	var content = String(fs.readFileSync(path.join(__dirname, req.params[0])));
	console.log(content)
	res.send(wrapMojoDeps(content));
});

/* serves all the static files */
app.get(/^(.+)$/, function(req, res) {
    res.sendfile(__dirname + req.params[0]);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
