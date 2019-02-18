

function render(instance){
    var self = this;
    var outResult =  `(function(${instance?instance:'client'},data,props){\n`
    outResult +=  `var exe = function(${instance?instance:'client'}, data) {\n`
    //return promise
    outResult += `return new Promise(function(res,rej){\n`
    //render children content
    self.children.forEach(function(item){
        switch(item.type){
            case 3:
                outResult +=  `/* testContent */\n`
                outResult +=  `${item.render()}\n `
                outResult +=  `return res()\n`
                break;
        }
    })
    //promise end
    outResult += `\})}\n`
    //EXE END
    outResult +=  `return function(){ return exe(client,data)}\n`
    //exe end
    outResult += `})(${instance?instance:'client'},data)\n` 
    return outResult
}




module.exports = {
    render
}


