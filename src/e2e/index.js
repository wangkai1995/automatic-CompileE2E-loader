

var E2EDefault = require('./defaultPrototype.js')

var generateElementAST = require('./generate/generateElementAST.js')
var connectElementAST = require('./generate/connectElementAST.js')

var { isEmptyArray,isExist,wranError } = require('../util/tool.js')



class E2E extends E2EDefault {

	//生成
	constructor(ast,options){
		super()
		var {
			root, 			//根节点 初始化时候传入
			resourcePath,
			parent,
			selfPath,
		} = options;
		if(!isExist(ast)){
       		wranError('generate e2e instalce fail: ast is not Exist')
       	}
		if(root && isEmptyArray(ast.attrs)){
			wranError('generate e2e instalce fail: ast object attribute is emptyArray')
		}
		var self = this;
		//参数
       	self.options = options
       	self.type = ast.type
       	self.tagName = ast.tagName
       	self.parent = parent
       	self.children = []
		//遍历attr将属性挂载在自身
		if(!isEmptyArray(ast.attrs)){
			ast.attrs.forEach(function(item){
				self[item.name] = item.value
			})
		}
		self.import = self.import || null
		self.$el = generateElementAST(self.import ,{
			resourcePath:resourcePath
		})
		self.$el = self.$el || (parent?parent.$el:false)
		//遍历生成子组件
		if(!isEmptyArray(ast.children)){
			ast.children.forEach(function(elAst){
				switch(elAst.type){
					case 1:
						self.children.push(new E2E(elAst,{
							parent:parent,
							resourcePath:resourcePath,
							selfPath:selfPath
						}))
						break;
					case 2:
						self.children.push(elAst)
						break;
					default:
						wranError('generate e2e instalce fail: ast children item is unknown type')
				}
			})
		}
		//end create Children
		self.connectTemplateRef(self.$el)
    }


    //连接模板实例
    connectTemplateRef(elRoot){
    	var self = this;
    	if(isEmptyArray(self.children) || !elRoot){
    		return false;
    	}
    	self.children.forEach(function(item){
    		if(item.type ===1 && item.import && item.$el){
    			//连接模板
    			connectElementAST(item,elRoot)
    			//节点链调用下去
    			if(!isEmptyArray(item.children)){
    				item.connectTemplateRef(elRoot)
    			}
    		}
    	})
    }

}








module.exports = E2E





