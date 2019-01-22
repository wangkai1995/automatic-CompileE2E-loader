

var TestContent = require('../content/index.js')


function createChildren(constructors){
    var self = this;
    var { isEmptyArray,isExist,wranError } = self.$tool
    //绕过cmd循环加载机制
    var { TestComponent,TestModule } = constructors
    var astChildren = self.$ast.children
    //check
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



module.exports = {
    createChildren
}
