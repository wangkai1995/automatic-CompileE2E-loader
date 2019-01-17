

var TestPrototype = require('../prototype/index.js')

var processAttrs = require('../tool/processAttrs.js')

var createServer = require('./create.js')
var patchServer = require('./patch.js')
var renderServer = require('./render.js')




class TestComponent extends TestPrototype  {
    //生成
    constructor(ast,options,props){
        super()
        var {
            resourcePath,
            selfPath,
            parent,
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
        this.data = {}
        this.ref = {}
        processAttrs(this.attrs,ast.attrs)
        //init
        this.init();
        console.log(this)
    } 


    init(){
        //generate data
        this.createData()
        //generate html template parse AST
        this.createElementAST();
        //generate refObj
        this.createRef();
        //generate children
        this.createChildren();
    }


}







module.exports = TestComponent





