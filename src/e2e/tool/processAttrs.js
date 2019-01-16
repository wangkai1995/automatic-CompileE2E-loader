



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




//处理剩余attr
function processSurplus(attrs,attrMap){
    for(var key in attrMap){
        var attr = {};
        attrs[key] = getAttributeMap(attrMap,key);
    }
}





//编译节点属性
module.exports = function processAttrs(aseAttrs ,attrs){
    var attrsMap = setAttributeMap(attrs)
    for(var i=0; i<attrs.length; i++){
        var key = attrs[i].name;
    }
    processSurplus(aseAttrs,attrsMap)
}


