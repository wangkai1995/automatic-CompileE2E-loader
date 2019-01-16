


var path = require('path');
var { isEmptyObject,wranError } = require('../../util/tool.js')




var connectElementAST = function(e2eAst,rootElAst){
	var refName = e2eAst.refName;
	var refMap = rootElAst.refMap
	if(isEmptyObject(refMap) || !refMap[refName] || !e2eAst.$el){
		return false;
	}
	refMap[refName].children.push(e2eAst.$el)
	e2eAst.$el.parent = refMap[refName]
}






module.exports = connectElementAST



