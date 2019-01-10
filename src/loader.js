
var fs = require('fs');
var path = require('path');
var loaderUtils = require("loader-utils");

var loadResource = require('./loadResource/index.js')

var templateParse = require('./template/index.js')
var compile = require('./compile/index.js')




module.exports = function(content) {
	var outResult = '';
	var options = loaderUtils.getOptions(this) || {};
	var resourcePath = this.resourcePath.replace(/\\/g,"/");
	options.resourcePath = resourcePath;
	//去除引入信息
	if(/module\.exports\s?=/.test(content)) {
		content = content.replace(/module\.exports\s?=\s?/, '');
	}else content = JSON.stringify(content);


	debugger;
	
	//load resoucre ok
	if(options.AST){
		var  e2eAST  = options.AST
	}else{
		var e2eAST = templateParse(content,{
			e2eParse:true
		})
		outResult  = loadResource(e2eAST,{
			resourcePath:options.resourcePath,
			root:true
		})
	}



	return outResult
};










