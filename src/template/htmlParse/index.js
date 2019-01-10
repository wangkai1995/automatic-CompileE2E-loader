
var { isNonPhrasingTag ,canBeleftOpenTag ,isUnaryTag }= require('../../util/index.js');
var parseHTML  = require('./html-parse');
var parseAttrs  = require('./attr-parse');




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
				e2eRef:false,
				className:false,
				children: [],
			}
			//编译处理提取到的attribute
			parseAttrs(element,attrs)
			//如果根节点不存在
			if(!rootEl){
				rootEl = element;
				//根组件特殊添加,方便快速找到元素
				rootEl.rootRefMap = {}
			}
			//父节点存在将自己加入父节点中
			if(currentParent){
				currentParent.children.push(element);
				// 为了编译JSON 这里取消防止循环解析BUG
				// element.parent = currentParent;
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







