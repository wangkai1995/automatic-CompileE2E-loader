


var path = require('path');
var { isEmptyObject,wranError } = require('../../util/tool.js')




var connectElementAST = function(e2eAst,rootElAst){
	var ref = e2eAst.ref;
	var refMap = rootElAst.refMap
	if(isEmptyObject(refMap) || !refMap[ref] || !e2eAst.$el){
		return false;
	}
	refMap[ref].children.push(e2eAst.$el)
}






module.exports = connectElementAST



