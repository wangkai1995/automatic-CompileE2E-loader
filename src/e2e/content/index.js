

var TestPrototype = require('../prototype/index.js')

var renderServer = require('./render.js')

class TestContent extends TestPrototype  {

	//生成
	constructor(ast,options){
		super()
        var {
            ref,
            parent,
        } = options;
        var { isEmptyArray,isExist,wranError,extend } = this.$tool
        //check
        if(!isExist(ast)){
            wranError('generate testcontent Instance fail: ast is not Exist')
        }
        if(!isExist(ast.exp) && !isExist(ast.text)){
            wranError('generate testcontent Instance fail: ast.text and ast.exp is not Exist')
        }
        //mixin
        this.$mixin(renderServer)
        //params
        this.$ast = ast;
        this.options = options
        this.type = ast.type
        this.parent = parent || false;
        this.ref = ref || {};
    }

}







module.exports = TestContent





