



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
        return attrValue.replace(/[\r\n\s\t]/g,'');
    }
}




//处理剩余attr
function processSurplus(elm,attrMap){
    var attrReg = /^\$([a-zA-Z]+)/i
    var propsReg = /^\:([a-zA-Z]+)/

    for(var key in attrMap){
        if(attrReg.test(key)){
            elm.attrs[key.match(attrReg)[1]] = getAttributeMap(attrMap,key);
            continue;
        }
        if(propsReg.test(key)){
            elm.props[key.match(propsReg)[1]] = getAttributeMap(attrMap,key);
            continue;
        }
    }
}





//编译节点属性
module.exports =  function parseAttrs(astElm ,attrs){
    var attrsMap = setAttributeMap(attrs)
    var elm = astElm;
    processSurplus(elm,attrsMap)
}


