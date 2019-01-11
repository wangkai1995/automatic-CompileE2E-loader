


var fs = require('fs');
var path = require('path');
var templateParse = require('../../template/index.js')
var { isEmptyArray,wranError } = require('../../util/tool.js')




var generateElementAST = function(importPath,options){
	var {
		resourcePath
	} = options
	if(!importPath){
		return false;
	}
	var mikdr = path.dirname(resourcePath)
	var filePath = path.resolve(mikdr,importPath)
	var resource = fs.readFileSync(filePath,'utf-8')

	var elAST = templateParse(resource)

	return  elAST;
}






module.exports = generateElementAST 



