
var TestModule = require('../module/index.js')
var TestContent = require('../content/index.js')
var TestImport = require('../import/index.js')


var generateElementAST = require('../tool/generateElementAST.js')
var connectElementAST = require('../tool/connectElementAST.js')


function createData(){
    var { wranError,extend } = this.$tool
    var initData = {}
    var props = this.$ast.props || {}
    if(this.tagName === 'testcomponent' && props['data']){
        try{
            initData =  JSON.parse(props['data'])
        }catch(e){
            console.error('generate TestComponent generate error: create refObj init Json.parse error:'+e)
        }
    }
    this.data = initData
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



function createChildren(constructors){
    var self = this;
    var { isEmptyArray,isExist,wranError } = self.$tool
    //绕过cmd循环加载机制
    var { TestComponent } = constructors
    var astChildren = self.$ast.children
    if(isEmptyArray(astChildren)){
        return false;
    }
    astChildren.forEach(function(item){
        var type = item.type;
        switch(type){
            case 1:
                self.children.push( new TestImport(item,{
                    resourcePath:self.options.resourcePath,
                    selfPath:self.options.selfPath,
                    parent:self,
                    TestModule:TestModule,
                    TestContent:TestContent,
                    TestComponent:TestComponent,
                }/*options*/,self.data/*props*/))
            case 2:
                self.children.push( new TestModule(item,{
                    resourcePath:self.options.resourcePath,
                    selfPath:self.options.selfPath,
                    parent:self,
                    TestComponent:TestComponent,
                }/*options*/,{
                    patchElementAndRef:self.patchElementAndRef.bind(self),
                    ref:self.ref,
                    data:self.data,
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