var path = require('path');
var { isEmptyObject,wranError } = require('../../../util/tool.js')




var generateRef = function(refName,elAst){
	console.log(refName,elAst)
	debugger;
	if(refName !== elAst.e2eRef){
		wranError(`refName:${refName} is not match elAst`)
	}
	var ref = {}
	//获取DOM节点path
	ref[refName] = getNodePath(elAst);

}




var getNodePath = function(elAst){
	var directive = false;
	if(elAst.e2eDirective){
		debugger;
	}

	

}






module.exports = generateRef



