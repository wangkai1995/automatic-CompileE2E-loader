//提供一个渲染函数
function render(){
    var { exp ,text } = this.$ast
    var outResult = ''
    if(exp){
        // console.log('with(this){return`'+exp+'`}')
        var renderFn = new Function('with(this){return`'+exp+'`}')
        outResult = renderFn.call(this)
    }else{
        outResult = text
    }
    // console.log(outResult)
    // debugger;
    return outResult
}



//render function
function _s(content){
    var { toString } = this.$tool
    return toString(content)
}








module.exports = {
    render,
    _s
}



