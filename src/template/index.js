

var htmlParse = require('./htmlParse/index.js')
var e2eParse = require('./e2eParse/index.js')



var fristSignReg = /^([\r\n\s\t]+)(?:<((?:[a-zA-Z_][\w\-\.]*\:)?[a-zA-Z_][\w\-\.]*))?/
var lastSignReg = /(?:(?:(?:[a-zA-Z_][\w\-\.]*\:)?[a-zA-Z_][\w\-\.]*)\/?>)?([\r\n\s\t]+)$/



var templateParse = function(template,options){
	//修正
	options = options || {};
	var template = options.e2eParse?JSON.parse(template):template
	var firstSign = false;
	var lastSign = false
	//去除标签开头符号
	if(fristSignReg.test(template)){
		var codes = template.match(fristSignReg)
		if(codes && codes.length > 1){
			fristSign = codes[1]
			template = template.replace(fristSign,'')
		}
	}
 	//去除标签尾符号
 	if(lastSignReg.test(template)){
		var codes = template.match(lastSignReg)
		if(codes && codes.length > 1){
			lastSign = codes[1]
			template = template.replace(lastSign,'')
		}
	}
	//tenmplate
	var AST = options.e2eParse?e2eParse(template,options):htmlParse(template,options);
	//done
	return AST
}








module.exports = templateParse 



