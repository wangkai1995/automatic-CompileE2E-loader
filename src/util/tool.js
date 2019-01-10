function wranError(err){
    throw new Error('[automatic-CompileE2E-loader]find Error: '+err)
}

/**
 * 检查script基本数据类型
 * @param mixed value
 * @return boolean
 */
function isNumber(value) {
    return Object.prototype.toString.call(value) == '[object Number]';
}
function isString(value) {
    return Object.prototype.toString.call(value) == '[object String]';
}
function isArray(value) {
    return Object.prototype.toString.call(value) == '[object Array]';
}
function isBoolean(value) {
    return Object.prototype.toString.call(value) == '[object Boolean]';
}
function isUndefined(value) {
    return value === undefined;
}
function isNull(value) {
    return value === null;
}
function isExist(value){
    return !isUndefined(value) && !isNull(value)
}
function isSymbol(value) {
    return Object.prototype.toString.call(value) == '[object Symbol]';
}
function isObject(value) {
    return (
        Object.prototype.toString.call(value) == '[object Object]' ||
        // if it isn't a primitive value, then it is a common object
        (!isNumber(value) &&
            !isString(value) &&
            !isBoolean(value) &&
            !isArray(value) &&
            !isNull(value) &&
            !isFunction(value) &&
            !isUndefined(value) &&
            !isSymbol(value)
        )
    );
}
function isEmptyObject(obj) {
    if (!isObject(obj)) {
        return true;
    }
    for (var key in obj) {
        return false;
    }
    return true
}
function isEmptyArray(array) {
    if (!isArray(array)) {
        return true
    }
    return array.length > 0 ? false : true
}
function isFunction(value) {
    return Object.prototype.toString.call(value) == '[object Function]';
}

/*
  转换工具
 */
function toArray(array) {
    return Array.prototype.slice.call(array)
}
function toString(content) {
    if (!content) {
        return '';
    }
    if (typeof content === 'string') {
        return content
    }
    return content.toString()
}





module.exports = {
    wranError,
    
    isNumber,
    isString,
    isArray,
    isBoolean,
    isUndefined,
    isNull,
    isExist, 
    isSymbol,
    isObject,
    isEmptyObject,
    isEmptyArray,
    isFunction,
    toArray,
    toString,
}



