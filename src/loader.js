
var fs = require('fs');
var path = require('path');
var loaderUtils = require("loader-utils");


var templateParse = require('./template/index.js')
var { TestComponent } = require('./e2e/index.js')

//文件创建标识
var fileCreateFlag = false;


module.exports = function(content,props) {
	// debugger;
	var outResult = '';
	var options = loaderUtils.getOptions(this) || {};
	var resourcePath = this.resourcePath.replace(/\\/g,"/");
	options.resourcePath = resourcePath;
	options.selfPath = path.resolve(__dirname,'./loader.js');
	options.selfPath = options.selfPath.replace(/\\/g,"\\\\")
	//去除引入信息
	if(/module\.exports\s?=/.test(content)) {
		content = content.replace(/module\.exports\s?=\s?/, '');
	}else content = JSON.stringify(content);
	//解析E2E ast语法树
	var AST = templateParse(content,{
		e2eParse:true
	})
	// 生成实例对象
	var instance = new TestComponent(AST,options)
	//test create test.file
	var fileContent = instance.render()

	//writeFile
	if(!fileCreateFlag){
		fs.writeFileSync(path.resolve(options.output,'index.test.js'), fileContent);
		fileCreateFlag = true
	}else{
		fs.writeFileSync(path.resolve(options.output,'index.test.js'),fileContent,{ 'flag': 'a' });
	}

	return outResult
};










