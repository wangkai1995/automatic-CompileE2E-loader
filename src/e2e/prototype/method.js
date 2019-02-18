var tool = require('../../util/tool.js')
var getDomSign = require('./getDomSign.js')





//全局混合当前class方法
function $mixin(provider) {
    var { isObject,isEmptyObject,wranError}  = tool
    if (!provider || !isObject(provider) || isEmptyObject(provider)) {
        wranError('$mixin receive params not right')
        return false;
    }
    for (var key in provider) {
        if (this[key]) {
            wranError(' $mixin method key: '+key+' is exist')
            continue
        }
        this[key] = provider[key]
    }
}



//获取节点路径
function $getElementPath(elAst){
    var { isEmptyObject,isExist }  = tool
    var el = elAst;
    var path = []
    var maxError = 5000;
    var step = 1;
    var parent = false;
    while(el && el.parent && step<maxError){
        step++;
        parent = el.parent
        //check Directive index
        if(!isEmptyObject(el.e2eDirective) && isExist(el.e2eDirective['index'])){
            var index = el.e2eDirective['index']
            path.push(':nth-child('+(index)+')>')
            el = parent;
            continue;
        }
        //seach index
        var len = parent.children.length
        for(var i=0;i<len; i++){
            var child = parent.children[i]
            if( child.nodeId === el.nodeId){
                var index = ':nth-child('+(i+1)+')>'
                path.push(index)
                break
            }
        }
        el = parent;
    }
    if(parent){
        path.push(getDomSign(parent)+'>')
    }
    switch(path.length){
        case 0:
            path.push(getDomSign(elAst))
            path = path.reverse().join('')
            break;
        case 1:
            path = path.reverse().join('')
            break;
        default :
            path = path.reverse().join('')
            path = path.substring(0, path.length-1)
            break;
    }
    return path
}



//patch update ref add prefix
function $patchRefAddPrefix(prefix,ref){
    var { extend } = tool 
    var refMap = extend({},ref)
    var newRef = {}
    for(var key in refMap ){
        var refValue = refMap[key]
        newRef[key] = prefix+' '+refValue
    }
    return newRef
}



//recursion update ref
function $patchRecursionUpdateRef(instance,newRef){
    var { isEmptyObject,isEmptyArray,isExist,extend }  = tool
    if(!isExist(instance) || isEmptyObject(instance)){
        wranError(' $patchRecursionUpdateRef method instance is not exist ')
        return false;
    }
    if(!isExist(instance.ref) || isEmptyObject(instance.ref)){
        return false;
    }
    instance.ref = extend({},instance.ref,newRef)
    if(isEmptyArray(instance.children)){
        return false;
    }
    instance.children.forEach(function(item){
        $patchRecursionUpdateRef(item,newRef)
    })
}





module.exports = {
    $mixin,
    $getElementPath,
    $patchRefAddPrefix,
    $patchRecursionUpdateRef
}