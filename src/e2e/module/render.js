

function render(instance){
    var self = this;
    var outResult = `(function(${instance?instance:'client'},data,props){ \n`
    //return promise
    outResult += `\treturn new Promise(function(res,rej){ \n`
    //render children content
    self.children.forEach(function(item){
        //label
        outResult +=  `\t\t/* testContent */\n`
        outResult +=  `\t\t${item.render()} \n`
        outResult +=  `\t\tres() \n`
    })
    //promise end
    outResult += `\t\}) \n`
    //exe end
    outResult += `\t})(${instance?instance:'client'},data,${this.props?JSON.stringify(this.props):'false'}),\n` 
    return outResult
}




module.exports = {
    render
}


