

var TestPrototype = require('../prototype/index.js')
var TestModule = require('../module/index.js')
var TestContent = require('../content/index.js')


var processAttrs = require('./init/processAttrs.js')
var generateElementAST = require('./init/generateElementAST.js')
var connectElementAST = require('./init/connectElementAST.js')
var generateRef = require('./init/generateRef.js')



class TestComponent extends TestPrototype  {
	//生成
	constructor(ast,options,pros){
		super()
		var {
			resourcePath,
			parent,
			selfPath,
		} = options;
		var { isEmptyArray,isExist,wranError } = this.$tool
		//check
		if(!isExist(ast)){
       		wranError('generate TestComponent instalce fail: ast is not Exist')
       	}
		if(isEmptyArray(ast.attrs)){
			wranError('generate TestComponent instalce fail: ast object attribute is emptyArray')
		}
		if(ast.tagName !== "testcomponent"){
			wranError('generate TestComponent instalce fail: ast tagName !== "testcomponent" ')
		}
		//params
       	this.options = options
       	this.type = ast.type
       	this.tagName = ast.tagName
       	this.parent = parent || false;
       	this.children = []
       	this.attrs = {}
       	processAttrs(this,ast.attrs)
		//get import html template parse AST
		var importPath = this.attrs['import']
		this.$el = generateElementAST(importPath,{
			resourcePath:resourcePath
		})
		if(!this.$el){
			wranError('generate TestComponent instalce fail: html template parse Ast fail import:'+importPath)
		}
		//generate children
		console.log(this)
    }
}







module.exports = TestComponent





