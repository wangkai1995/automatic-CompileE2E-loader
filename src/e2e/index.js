


var generate = require('./generate/index.js')
var { isEmptyArray,isExist,wranError } = require('../util/tool.js')



class E2E {
	//生成
	constructor(ast,options) {
		var self = this;
		var {
			resourcePath,
			root,
			parent
		} = options;
		//系统参数
       	self.options  =  options
       	self.$el = false;
       	if(!isExist(ast)){
       		wranError('generate e2e instalce fail: ast is not Exist')
       	}
		if(isEmptyArray(ast.attrs)){
			wranError('generate e2e instalce fail: ast object attribute is emptyArray')
		}
		//遍历attr将属性挂载在自身
		ast.attrs.forEach(function(item){
			self[item.name] = item.value
		})
		console.log(self)
		//如果存在对应引用 提取出来
		if(self['import']){
			self.$el = generate(self['import'],{
				resourcePath:resourcePath
			})
		}

    }
    //添加子组件
    appendChildEl(child){

    }
}






module.exports = E2E


