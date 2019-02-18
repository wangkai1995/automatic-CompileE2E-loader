


var tool = require('../../util/tool.js')
var methodServer = require('./method.js')



class TestPrototype {

    constructor(config) {
        //根实例初始化
        //全局实例提供工具
        this.$tool = tool.extend({},tool)
        this.$constructor = {}
        //$mixin
        methodServer.$mixin.call(this,methodServer)
    }

}






module.exports = TestPrototype 

