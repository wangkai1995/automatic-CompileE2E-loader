

function render(instance){
    var self = this;
    var outResult = `(function(${instance?instance:'client'},data){ \n`
    //return promise
    outResult += `\treturn new Promise(function(res,rej){ \n`
    //render children content
    self.children.forEach(function(item){
        switch(item.type){
            case 3:
                outResult +=  `\t\t/* testContent */\n`
                outResult +=  `\t\t${item.render()} \n`
                outResult +=  `\t\tres() \n`
                break;
        }
    })
    //promise end
    outResult += `\t\}) \n`
    //exe end
    outResult += `\t})(${instance?instance:'client'},data),\n` 
    return outResult
}




module.exports = {
    render
}


