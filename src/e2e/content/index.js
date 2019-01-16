

var TestPrototype = require('../prototype/index.js')



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
            wranError('generate testcontent instalce fail: ast is not Exist')
        }
        if(!isExist(ast.exp) && !isExist(ast.text)){
            wranError('generate testcontent instalce fail: ast.text and ast.exp is not Exist')
        }
        //params
        this.$ast = ast;
        this.renderContent = ast.text;
        this.options = options
        this.type = ast.type
        this.tagName = ast.tagName
        this.parent = parent || false;
        this.ref = ref || {};
        console.log(this)

        this.render()

        debugger;
    }


    //提供一个渲染函数
    render(){
        var { exp ,text } = this.$ast
        var outResult = ''
        if(exp){
            // console.log('with(this){return`'+exp+'`}')
            var renderFn = new Function('with(this){return`'+exp+'`}')
            outResult = renderFn.call(this)
        }else{
            outResult = text
        }
        console.log(outResult)
        debugger;
    }



    //render function
    _s(content){
        var { toString } = this.$tool
        return toString(content)
    }
}







module.exports = TestContent





