
var TestModule = require('../module/index.js')
var TestContent = require('../content/index.js')
var TestComponent = require('./index.js')

var generateElementAST = require('../tool/generateElementAST.js')
var generateRef = require('../tool//generateRef.js')
var connectElementAST = require('../tool/connectElementAST.js')


function createData(){
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


function createRef(){
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


function createElementAST(){
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


function createChildren(){
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



module.exports ={
    createData,
    createRef,
    createElementAST,
    createChildren
}