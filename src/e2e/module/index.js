

var TestPrototype = require('../prototype/index.js')


var createServer = require('./create.js')
var patchServer = require('./patch.js')
var renderServer = require('./render.js')


var TestComponent = require('../component/index.js')



class TestModule extends TestPrototype  {

	//生成
	constructor(ast,options,props){
		super()
        var {
            resourcePath,
            selfPath,
            parent,
            TestComponent
        } = options;
        var { extend,isEmptyObject,isExist,wranError,extend } = this.$tool
        //check
        if(!isExist(ast)){
            wranError('generate testmodule Instance fail: ast is not Exist')
        }
        if(isEmptyObject(ast.attrs)){
            wranError('generate testmodule Instance fail: ast object attribute is emptyObject')
        }
        if(ast.tagName !== "testmodule"){
            wranError('generate testmodule Instance fail: ast tagName !== "testmodule" ')
        }
        this.$mixin(createServer)
        this.$mixin(patchServer)
        this.$mixin(renderServer)
        //params
        this.testComponentConstructor = TestComponent
        this.options = options
        this.props = props || false;
        this.type = ast.type
        this.tagName = ast.tagName
        this.parent = parent || false;
        this.$ast = ast;
        //node attribute
        this.attrs = extend({},ast.attrs)
        this.ref = extend({},this.props.ref)
        this.children = []
        //init
        this.init()
    }


    init(){
        //generate html AST
        this.patchElementASTAndRef()
        //create child
        this.createChildren({
            TestComponent:this.testComponentConstructor,
            TestModule:TestModule
        })
    }


}







module.exports = TestModule





