


var expReg = /\{\{((?:.|\n)+?)\}\}/;
var expEndReg = /(?:[^;{])(\\n(?:[\s\b]){0,})(?:[^\.\s])/gi





// filter还没做
var parseText = function(text){
    var tokenExp = [];
    var expMatch 
    var nextIndex,lastIndex = 0;
    if( !expReg.test(text) ){
        return false;
    }
    //修正;闭合
    var checkText = JSON.stringify(text)
    if( expEndReg.test(checkText) ){
        checkText = checkText.replace(expEndReg,function(code){
            return code.replace(/\\n(?:[\s\b]){0,}/g,';\\n ')
        })
        text = JSON.parse(checkText)
    }
    while( (expMatch = expReg.exec(text)) ){
        //如果表达式之前有内容
        if(expMatch.index > lastIndex){
            tokenExp.push(''+text.slice(0,expMatch.index)+'"${')
            text = text.substring(expMatch.index);
        }
        //中间表达式内容
        lastIndex = expMatch.index;
        text = text.substring(expMatch[0].length);
        tokenExp.push('_s('+expMatch[1].trim()+')');
        //判断中间是否还有字符
        nextIndex = text.indexOf('{{');
        if(nextIndex > 0){
            tokenExp.push('}"'+text.slice(0,nextIndex)+'"${')
            text = text.substring(nextIndex);
        }
        //表达式之后还有字符
        if(lastIndex !== 0){
            //如果后面还有表达式
            if(expReg.test(text)){
                 continue
            }else{
               tokenExp.push('"'+text.slice(0,lastIndex)+'') 
            }
        }
    }
    if(lastIndex<text.length){
        tokenExp.push('}"'+text.slice(lastIndex,text.length)+'')
    }

    return tokenExp.join('').replace(/[\r\t\n\b]/g,'');
}




module.exports = parseText


