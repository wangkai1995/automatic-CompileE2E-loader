
var path = require('path');
var { 
		isEmptyObject,
		isEmptyArray,
		wranError 
} = require('../util/tool.js')
var getImportResource = require('./importHtmlTemplate.js')



var loadResource = function(ast,options){

	var importPaths = [];
	var { resourcePath,root } = options;
	//checK
	if(isEmptyObject(ast)){
		wranError('astObj is EmptyObject')
	}

	debugger;
	//get import
	if( !isEmptyArray(ast.attrs) ){
		ast.attrs = ast.attrs.map(function(item){
			if(item.name === 'import' && item.value){
				var { key,path } = getImportResource(item.value,resourcePath)
				importPaths.push(`var ${key} = require(!raw-loader!${path});\\n`)
				item.value = key
			}
			return item
		})
	}
	//child get
	if(!isEmptyArray(ast.children)){
		ast.children.forEach(function(item){
			if(item.type === 1){
				var childImportPath = loadResource(item,{
					resourcePath:resourcePath
				})
				importPaths = importPaths.concat(childImportPath )
			}
		})
	}
	//递归返回
	if(!root){
		return importPaths
	}
	console.log(importPaths,ast)
	return true
}









module.exports = loadResource

