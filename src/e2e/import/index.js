

var TestPrototype = require('../prototype/index.js')


var createServer = require('./create.js')
var patchServer = require('./patch.js')
var renderServer = require('./render.js')




class TestImport extends TestPrototype  {
    //生成
    constructor(ast,options,props){
        super()
        var {
            resourcePath,
            selfPath,
            parent,
            TestModule,
            TestContent,
            TestComponent,
        } = options;
        var { extend,isEmptyArray,isEmptyObject,isExist,isString,wranError } = this.$tool
        //validate
        if(isEmptyObject(ast)){
            wranError('generate TestImport Instance fail: ast is emptyObject or undefined')
        }
        if(isEmptyObject(ast.attrs)){
            wranError('generate TestImport Instance fail: ast object attribute is emptyObject')
        }
        if(ast.tagName !== "testimport"){
            wranError('generate TestImport Instance fail: ast tagName !== "testimport" ')
        }
        this.$mixin(createServer)
        this.$mixin(renderServer)
        this.$mixin(patchServer)
        //params
        this.options = options
        this.props = props || false;
        this.type = ast.type
        this.tagName = ast.tagName
        this.parent = parent || false;
        this.$ast = ast;
        //node attribute
        this.attrs = extend({},ast.attrs)
        this.instance = false;
        //init
        this.init();
    } 


    init(){
        // create import instance
        this.createInstance()
    }


}







module.exports = TestImport





