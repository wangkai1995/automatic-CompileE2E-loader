
var fs = require('fs');
var path = require('path');


function createInstance(){
    var { extend,isEmptyObject } = this.$tool
    var { TestModule,TestContent,TestComponent,resourcePath,selfPath } =  this.options
    var { $patchRefAddPrefix,$patchRecursionUpdateRef } = this
    var ast = this.$ast
    //处理props
    var props = false
    var elProps = ast.props
    if(!isEmptyObject(elProps)){
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
    }/*options*/,props/*props*/);
    
    /*  patch update instance ref  */
    var refName = this.attrs['refName']
    if( refName && this.parent.ref ){
        var prefix = this.parent.ref[refName]
        var newRef = $patchRefAddPrefix(prefix,this.instance.ref)
        $patchRecursionUpdateRef(this.instance,newRef)
    }

    
    console.log(this)
    debugger
}






module.exports ={
    createInstance
}


