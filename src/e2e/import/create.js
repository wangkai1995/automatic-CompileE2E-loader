
var fs = require('fs');
var path = require('path');


function createInstance(){
    var { extend,isEmptyObject } = this.$tool
    var { TestModule,TestContent,TestComponent,resourcePath,selfPath } =  this.options
    var ast = this.$ast
    //处理props
    var props = false
    var elProps = ast.props
    if(!isEmptyObject(elProps) && !isEmptyObject(this.props)){
        props = this.patchProps(elProps,this.props)
    }

    var importPath = this.attrs['importComponent']
    if(!importPath){
        return false;
    }
    var mikdr = path.dirname(resourcePath)
    var filePath = path.resolve(mikdr,importPath)
    var resource = fs.readFileSync(filePath,'utf-8')
    //create instance
    this.instance = new TestComponent(resource,{
        resourcePath:filePath,
        selfPath:selfPath,
        parent:this.parent,
    }/*options*/,props/*props*/)

    console.log(this)
    debugger
}











module.exports ={
    createInstance
}