




var patchProps = function(astProps,paramProps){
    var booleanReg = /(?:[\s\t\r\n]*)?(true|false)(?:[\s\t\r\n]*)?/i;
    var stringReg = /(?:[\s\t\r\n]*)?(?:'|")+(.+)+(?:'|")+(?:[\s\t\r\n]*)?/i;
    var { isExist ,isNumber,isString } = this.$tool 
    var props = {}
    for(var key in astProps){
        var value = astProps[key]
        //check paramsProps
        if(paramProps[value]){
            props[key] = paramProps[value]
            continue;
        }
        //check isBoolean
        if(booleanReg.test(value)){
            props[key] = JSON.parse(value.match(booleanReg)[1])
            continue;
        }
        //check number
        if(!isNaN(parseFloat(value)) && isNumber(parseFloat(value))){
            props[key] = new Number(value)
            continue;
        }
        //string
        if(stringReg.test(value)){
            props[key] = value.replace(stringReg,'$1')
            continue;
        }
        // empty 
        props[key] = null
    }
    return props
}










module.exports ={
    patchProps
}



