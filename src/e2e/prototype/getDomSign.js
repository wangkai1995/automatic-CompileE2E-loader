




module.exports = function getDomSign(el){
    
    var fristClassReg = /^([^\s\r\t\n]+)+/
    var sign = false;
    if(el.id){
        sign = '#'+el.id
    }else if(el.className && fristClassReg.exec(el.className)){
        sign = '.'+el.className.match(fristClassReg)[1]
    }else{
        sign = el.tagName
    }
    return sign 
}