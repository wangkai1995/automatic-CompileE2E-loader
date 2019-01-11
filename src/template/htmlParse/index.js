
var { isNonPhrasingTag ,canBeleftOpenTag ,isUnaryTag }= require('../../util/index.js');
var parseHTML  = require('./html-parse');
var parseAttrs  = require('./attr-parse');
var processRef = require('./process-ref')



var parse = function(template){
	var stack = [];
	var rootEl;
	var currentParent ;	

	//开始解析
	parseHTML(template,{
		isNonPhrasingTag: isNonPhrasingTag,
		canBeleftOpenTag: canBeleftOpenTag,
		isUnaryTag: isUnaryTag,
		isIE: false,
		// 处理开始标签
		// 处理attribute部分还没做
		start: function(tag,attrs,unary){
			//组件
			var element = {
				type: 1,
				tagName:tag,
				attrs:[],
				children: [],
				//e2e attr
				e2eRef:false,  	//e2e实例
				e2eScopeFlag:false, 	 //是否容器
				e2eDirective:false,			 //是否包含tab
				e2eRefChild:[],
			}
			//编译处理提取到的attribute
			parseAttrs(element,attrs)
			//如果根节点不存在
			if(!rootEl){
				rootEl = element;
				rootEl.root = true;
				//根组件特殊添加,方便快速找到元素
				rootEl.refMap = {}
			}
			//添加跟组件引用
			if(element.e2eRef && element.e2eScopeFlag && !rootEl.refMap[element.e2eRef]){
				rootEl.refMap[element.e2eRef] =  element
			}
			//父节点存在将自己加入父节点中
			if(currentParent){
				currentParent.children.push(element);
				element.parent = currentParent;
			}
			//不是自闭合组件
			if(!unary){
				//赋值自己当前父节点
				currentParent = element
				//加入堆栈
				stack.push(element);
			}
		},
		//处理结束标签
		end: function(tagName){
			var el = stack.pop();
			if(el.children.length > 0){
				var lastNode = el.children[el.children.length -1 ];
				//移除最后一个空节点
				if(lastNode && lastNode.type === 3 && lastNode.text === ''){
					el.children.pop();
				}
			}
			//如果存在ref 并且是容器, 那么处理一下自己子节点,处理子节点ref引用关系
			if(el.e2eRef && el.e2eScopeFlag){
				processRef(el)
			}
			currentParent = stack[stack.length -1];
		},
		//处理文本
		chars: function(text){
			var expression;
			var text = text.trim();
			text = text.replace(/\'/g,'\"')
			currentParent.children.push({
				type:3,
				exp:null,
				text: text
			})
		}
	});
	return rootEl;
}







module.exports = parse







