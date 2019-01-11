
var fs = require('fs');
var path = require('path');
var loaderUtils = require("loader-utils");


var templateParse = require('./template/index.js')
var E2E = require('./e2e/index.js')




module.exports = function(content) {
	debugger;
	var outResult = '';
	var options = loaderUtils.getOptions(this) || {};
	var resourcePath = this.resourcePath.replace(/\\/g,"/");
	options.resourcePath = resourcePath;
	options.selfPath = path.resolve(__dirname,'./loader.js');
	options.selfPath = options.selfPath.replace(/\\/g,"\\\\")
	//去除引入信息
	if(/module\.exports\s?=/.test(content)) {
		content = content.replace(/module\.exports\s?=\s?/, '');
	}else content = JSON.stringify(content);

	//解析E2E ast语法树
	var AST = templateParse(content,{
		e2eParse:true
	})
	// console.log(AST)
	//生成E2E 实例对象
	var insalce = new E2E(AST,Object.assign({
		root:true
	},options))

	console.log(insalce)


	debugger;
	return outResult
};










