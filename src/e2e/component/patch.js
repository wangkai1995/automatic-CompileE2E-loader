//patch update element ref
function patchElementAndRef(el,childRefName){
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








module.exports = {
    patchElementAndRef,
}




