

var TestPrototype = require('../prototype/index.js')

var templateParse = require('../../template/index.js')


var createServer = require('./create.js')
var patchServer = require('./patch.js')
var renderServer = require('./render.js')




class TestComponent extends TestPrototype  {
    //生成
    constructor(content,options,props){
        super()
        var {
            resourcePath,
            selfPath,
            parent,
        } = options;
        var { extend,isEmptyArray,isEmptyObject,isExist,isString,wranError } = this.$tool
        //check  params
        if(!isExist(content)){
            wranError('generate TestComponent Instance fail: content is not Exist')
        }
        //如果传入的是字符串那么尝试解析E2E ast语法树
        if(isString(content)){
            var ast = templateParse(content,{
                e2eParse:true
            })
        }else{
            var ast = content;
        }
        //validate
        if(isEmptyObject(ast)){
            wranError('generate TestComponent Instance fail: ast is emptyObject or undefined')
        }
        if(isEmptyObject(ast.attrs)){
            wranError('generate TestComponent Instance fail: ast object attribute is emptyObject')
        }
        if(ast.tagName !== "testcomponent"){
            wranError('generate TestComponent Instance fail: ast tagName !== "testcomponent" ')
        }
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
        this.attrs = extend({},ast.attrs)
        this.children = []
        this.data = {}
        this.ref = {}
        //init
        this.init();
        // debugger;
    } 


    init(){
        //generate data
        this.createData()
        //generate html template parse AST
        this.createElementAST();
        //generate refObj
        this.createRef();
        //generate children
        this.createChildren({
            TestComponent:TestComponent
        });
    }


}







module.exports = TestComponent





