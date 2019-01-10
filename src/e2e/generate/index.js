


var fs = require('fs');
var path = require('path');
var templateParse = require('../../template/index.js')
var { isEmptyArray,wranError } = require('../../util/tool.js')




var generate = function(importPath,options){
	var {
		resourcePath
	} = options
	var mikdr = path.dirname(resourcePath)
	var filePath = path.resolve(mikdr,importPath)
	var resource = fs.readFileSync(filePath,'utf-8')

	debugger;
	var elAST = templateParse(resource)
	console.log( elAST)
	return  elAST;
}






module.exports = generate



