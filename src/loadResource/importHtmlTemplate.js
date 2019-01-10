
var path = require('path');
var md5 = require('md5');
var { isEmptyObject,wranError } = require('../util/tool.js')




var getImportResource = function(relativePath,originPath){
	var mikdr = path.dirname(originPath)
	var newPath = path.resolve(mikdr,relativePath)
	var key = md5(newPath).substring(0,10);
	return {
		path:newPath,
		key:key
	}
}









module.exports = getImportResource

