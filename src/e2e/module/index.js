

var TestPrototype = require('../prototype/index.js')
var TestComponent = require('../component/index.js')
var TestContent = require('../content/index.js')


var processAttrs = require('../tool/processAttrs.js')
var generateElementAST = require('../tool/generateElementAST.js')


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
        //generate html AST
        this.patchElementASTAndRef()
        //create child
        this.createChildren()
        // console.log(this)
        // debugger;
    }


    //patch 
    patchElementASTAndRef(){
        if(!this.attrs['importTemplate'] && this.attrs['refName']){
            return false;
        }
        var { resourcePath } = this.options
        var { wranError,extend } = this.$tool
        // parent function
        var { patchElementAndRef } = this.props
        //get import html template parse AST
        var importPath = this.attrs['importTemplate']
        var el = generateElementAST(importPath,{
           resourcePath:resourcePath
        })
        var newRef = patchElementAndRef(el,this.attrs['refName'])
        if(!newRef ){
            return false;
        }
        this.ref = extend({},newRef)
    }


    //createChildren
    createChildren(){
        var self = this;
        var { isEmptyArray,isExist,wranError } = self.$tool
        var astChildren = self.$ast.children
        if(isEmptyArray(astChildren)){
            return false;
        }
        astChildren.forEach(function(item){
            var type = item.type;
            switch(type){
                case 1:
                    self.children.push( new TestComponent(item,{
                        resourcePath:self.options.resourcePath,
                        selfPath:self.options.selfPath,
                        parent:self,
                    })/*props*/)
                    break;
                case 2:
                    self.children.push( new TestModule(item,{
                        resourcePath:self.options.resourcePath,
                        selfPath:self.options.selfPath,
                        parent:self,
                    }/*options*/,this.props/*props*/))
                    break;
                case 3:
                    self.children.push( new TestContent(item,{
                        ref:self.ref,
                        parent:self,
                    }/*options*/))
                    break;
                default:
                    wranError('generate TestModule instalce fail: child type is Unknown type:'+type)
            }
        })
      //end
    }


}







module.exports = TestModule





