


var tool = require('../../util/tool.js')



class TestPrototype {

    constructor(config) {
        //根实例初始化
        //全局实例提供工具
        this.$tool = tool.extend({},tool)
    }


    //全局混合当前class方法
    $mixin(provider) {
        var { isObject,isEmptyObject,wranError}  = this.$tool
        if (!provider || tool.isObject(provider) || isEmptyObject(provider)) {
            wranError('$mixin receive params not right')
        }
        for (var key in provider) {
            if (this[key]) {
                wranError(' $mixin method key: '+key+' is exist')
                continue
            }
            this[key] = provider[key]
        }
    }
}




module.exports = TestPrototype 

