
var { isEmptyArray,wranError } = require('../../util/tool.js')



module.exports =  function processRef(astElm,parentRef){
    var el = astElm;
    //如果parentRef存在表示递归中
    var childs = el.children
    if(isEmptyArray(childs)){
    	return false;
    }
    parentRef = parentRef || el.e2eRefChild;
    for(var i=0; i<childs.length; i++){
    	var childItem = childs[i]
    	if(childItem.type === 1){
    		//如果存在
    		if(childItem.e2eRef){
    		 	parentRef.push(childItem)
    		}
    		//递归子节点
    		processRef(childItem,parentRef)
    	}
    }
}