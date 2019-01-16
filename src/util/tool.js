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



/*获取唯一ID*/
function getUniqueID() {
    var id = 'xxxxtxxxx'.replace(/[xt]/g, function(c) {
        var r = Math.random() * 16 | 0,
            t = new Date().getTime(),
            v = c == 'x' ? r : (c == 't' ? t :(r & 0x3 | 0x8));
        return c == 't'? v: v.toString(16);
    });
    return id
}

/*
    深度合并内容
    引用类型克隆合并
    arguments[0] = target
    arguments type is Object Or Array
    多内容合并覆盖优先级: arguments[0]<arguments[1]<arguments[2]..
    如果sources 不是数组或者对象 则直接忽略
 */
function extend() {
    var args = toArray(arguments);
    if (args.length === 0) {
        console.error('extends params is undefined')
        return {};
    }
    if (args.length === 1) {
        return args[0]
    }
    var target = args[0];
    var sources = args.slice(1, args.length)

    if (!isObject(target) && !isArray(target)) {
        target = {};
    }
    sources.map(function(item) {
        //防止死循环
        if (target === item) {
            return false;
        }
        //如果内容是对象 
        if (isObject(item)) {
            //开始遍历
            for (var key in item) {
                //如果内容是对象
                if (isObject(item[key])) {
                    //修正数据
                    target[key] = (target[key] && isObject(target[key])) ? target[key] : {};
                    target[key] = extend(target[key], item[key])
                } else if (isArray(item[key])) {
                    //修正数据
                    target[key] = (target[key] && isArray(target[key])) ? target[key] : [];
                    target[key] = extend(target[key], item[key])
                } else {
                    //基本类型直接赋值
                    target[key] = item[key]
                }
            }
        } else if (isArray(item)) {
            for (var i = 0; i < item.length; i++) {
                //如果内容是对象
                if (isObject(item[i])) {
                    //修正数据
                    target[i] = (target[i] && isObject(target[i])) ? target[i] : {}
                    target[i] = extend(target[i], item[i])
                } else if (isArray(item[i])) {
                    //修正数据
                    target[i] = (target[i] && isArray(target[i])) ? target[i] : [];
                    target[i] = extend(target[i], item[i])
                } else {
                    //基本类型直接赋值
                    target[i] = item[i]
                }
            }
        }
        //其他类型直接忽略  
    })
    return target
}



module.exports = {
    wranError,
    //
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
    //
    toArray,
    toString,
    extend,
    getUniqueID
}



