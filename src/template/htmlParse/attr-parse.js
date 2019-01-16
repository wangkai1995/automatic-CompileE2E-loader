



//设置attribute映射
function setAttributeMap(attrs){
    var attribute = {};
    for(var i=0 ;i<attrs.length ;i++){
        attribute[attrs[i].name] = attrs[i].value; 
    }
    return attribute;
}




//提取attribute
function getAttributeMap(attrMap,attrKey){
    var keys = Object.keys(attrMap);
    if(keys.indexOf(attrKey) !== -1){
        var attrValue = attrMap[attrKey];
        delete attrMap[attrKey];
        return attrValue;
    }
}


//处理className
function processClass(elm,key,attrMap){
    if(key !== 'class'){
        return false
    }
    elm.className = getAttributeMap(attrMap,key)
}


//处理id
function processId(elm,key,attrMap){
    if(key !== 'id'){
        return false
    }
    elm.id = getAttributeMap(attrMap,key)
}



//处理e2eRef引用
function processE2eRef(elm,key,attrMap){
    var refReg = /^e2e-(?:[refChild|ref]){1}(?:.*)?$/i
    var refScopeReg = /^e2e-ref(?:-.*)?$/i
    var refDirectiveReg = /^e2e-(?:[refChild|ref]+){1}-(.+)+$/i
    if(!refReg.test(key)){
        return false
    }
    elm.e2eRef = getAttributeMap(attrMap,key)
    if(refScopeReg.test(key)){
        elm.e2eScopeFlag = true;
    }
    if(refDirectiveReg.test(key)){
        elm.e2eDirective = key.match(refDirectiveReg)[1]
    }
}






//处理剩余attr
function processSurplus(elm,attrMap){
    for(var key in attrMap){
        var attr = {};
        attr.name = key;
        attr.value = getAttributeMap(attrMap,key)
        elm.attrs.push(attr);
    }
}





//编译节点属性
module.exports =  function parseAttrs(astElm ,attrs){
    var attrsMap = setAttributeMap(attrs)
    var elm = astElm;
    for(var i=0; i<attrs.length; i++){
        var key = attrs[i].name;
        //处理id
        processId(elm,key,attrsMap)
        //class
        processClass(elm,key,attrsMap)
        //处理E2E编译相关内容
        processE2eRef(elm,key,attrsMap)
    }
    processSurplus(elm,attrsMap)
}


