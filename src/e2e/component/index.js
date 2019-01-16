

var TestPrototype = require('../prototype/index.js')
var TestModule = require('../module/index.js')
var TestContent = require('../content/index.js')


var processAttrs = require('../tool/processAttrs.js')
var generateElementAST = require('../tool/generateElementAST.js')
var generateRef = require('../tool//generateRef.js')


var connectElementAST = require('../tool/connectElementAST.js')


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
        //generate data
        this.createData()
        //generate html template parse AST
        this.createElementAST();
        //generate refObj
        this.createRef();
        //generate children
        this.createChildren();
        console.log(this)
    } 


    createData(){
        var { wranError,extend } = this.$tool
        var initData = {}
        var props = this.props || {}
        if(this.tagName === 'testcomponent' && this.attrs['initData']){
            try{
                initData =  JSON.parse(this.attrs['initData'])
            }catch(e){
                console.error('generate TestComponent generate error: create refObj init Json.parse error:'+e)
            }
        }
        this.data = extend(initData,props)
    }


    createRef(){
        var { isEmptyObject } = this.$tool;
        if(isEmptyObject(this.$el['refMap'])){
            return false;
        }
        var refMap = {} 
        //生成路径
        for(var key in this.$el['refMap']){
            var refItem = this.$el['refMap'][key]
            if(!refItem.path){
                refItem.path = this.$getElementPath(refItem.$el)
                refMap[key] = refItem.path
            }
        }
        this.ref = refMap
    }


    createElementAST(){
        var { resourcePath } = this.options
        var { wranError } = this.$tool
        //get import html template parse AST
        var importPath = this.attrs['importTemplate']
        this.$el = generateElementAST(importPath,{
           resourcePath:resourcePath
        })
        if(!this.$el){
           wranError('generate TestComponent instalce fail: html template parse Ast fail import:'+importPath)
        } 
    }
    

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
                    }/*options*/,{
                        patchElementAndRef:self.patchElementAndRef.bind(self),
                        ref:self.ref
                    }/*props*/))
                    break;
                case 3:
                    self.children.push( new TestContent(item,{
                        ref:self.ref,
                        parent:self,
                    }/*options*/))
                    break;
                default:
                    wranError('generate TestComponent instalce fail: child type is Unknown type:'+type)
            }
        })
      //end
    }


    //patch update element ref
    patchElementAndRef(el,childRefName){
        var  { refMap } = this.$el
        var { isEmptyObject } = this.$tool;
        if(!refMap[childRefName]){
            return false;
        }
        var elContainer = refMap[childRefName]
        if(isEmptyObject(el['refMap'])){
            return false;
        }
        var refMap = {} 
        //生成路径
        for(var key in el['refMap']){
            var refItem = el['refMap'][key]
            if(!refItem.path){
                refItem.path = this.$getElementPath(refItem.$el)
                refMap[key] = elContainer.path+' '+refItem.path
            }
        }
        //mixin ref
        for(var key in refMap){
            // exist
            if(this.ref[key]){
                console.error('ref mixin error:'+key+'is exist')
                continue
            }
            this.ref[key] = refMap[key]
        }
        return this.ref
    }

}







module.exports = TestComponent





