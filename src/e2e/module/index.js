

var TestPrototype = require('../prototype/index.js')

var processAttrs = require('../tool/processAttrs.js')



var createServer = require('./create.js')
var patchServer = require('./patch.js')
var renderServer = require('./render.js')



class TestModule extends TestPrototype  {

	//生成
	constructor(ast,options,props){
		super()
        var {
            resourcePath,
            selfPath,
            parent,
        } = options;
        var { isEmptyArray,isExist,wranError,extend } = this.$tool
        //check
        if(!isExist(ast)){
            wranError('generate testmodule instalce fail: ast is not Exist')
        }
        if(isEmptyArray(ast.attrs)){
            wranError('generate testmodule instalce fail: ast object attribute is emptyArray')
        }
        if(ast.tagName !== "testmodule"){
            wranError('generate testmodule instalce fail: ast tagName !== "testmodule" ')
        }
        //mixin
        this.$mixin(createServer)
        this.$mixin(patchServer)
        this.$mixin(renderServer)
        //params
        this.options = options
        this.props = props || false;
        this.type = ast.type
        this.tagName = ast.tagName
        this.parent = parent || false;
        this.$ast = ast;
        //node attribute
        this.children = []
        this.attrs = {}
        this.ref = extend({},this.props.ref)
        processAttrs(this.attrs,ast.attrs)
        //init
        this.init()
        // console.log(this)
        // debugger;
    }


    init(){
        //generate html AST
        this.patchElementASTAndRef()
        //create child
        this.createChildren()
    }


}







module.exports = TestModule





