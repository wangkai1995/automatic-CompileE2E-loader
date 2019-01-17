
var generateElementAST = require('../tool/generateElementAST.js')


function patchElementASTAndRef(){
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




module.exports = {
    patchElementASTAndRef
}