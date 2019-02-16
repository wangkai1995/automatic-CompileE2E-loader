


function renderExport(){
    var self = this;
    var { name,importTemplate,instance } = self.attrs
    var outResult = `module.exports['${name?name:importTemplate}'] = `;
    //render head
    outResult += `function(${instance?instance:'client'}) { \n`
    //render data
    outResult += `\t\tvar data = ${JSON.stringify(self.data)};\n`
    //promise all model
    outResult += `\t\treturn Promise.all([\n`
    //render children content
    self.children.forEach(function(item){
        switch(item.type){
            case 1:
                //testImport
                outResult += `\t/*${item.tagName} -${item.attrs['importComponent']}*/\n`
                outResult +=  `\t${item.render()}\n`
                break;
            case 2:
                //testModule
                outResult += `\t/* ${item.tagName} - ${item.attrs['refName']} */\n`
                outResult +=  `\t${item.render(instance)}\n`
                break;
            case 3:
                //testContent
                outResult +=  `\t/* testContent */\n`
                outResult += `\t(function(${instance?instance:'client'},data){ \n`
                outResult +=  `\t${item.render()} \n`
                outResult += `\t})(${instance?instance:'client'},data), \n` 
                break;
        }
    })
    //promise all end
    outResult += `\t\t])\n`
    //render end
    outResult += `\t};\n`

    return outResult
}






function render(){
    var self = this;
    var { instance } = self.attrs
    var outResult = `(function(${instance?instance:'client'},data,props) { \n`
    //promise all model
    outResult += `\t\treturn Promise.all([\n`
    //render children content
    self.children.forEach(function(item){
        switch(item.type){
            case 1:
                //testImport
                outResult += `\t/*${item.tagName} -${item.attrs['importComponent']}*/\n`
                outResult +=  `\t${item.render()}\n`
                break;
            case 2:
                //testModule
                outResult += `\t/* ${item.tagName} - ${item.attrs['refName']} */\n`
                outResult +=  `\t${item.render(instance)}\n`
                break;
            case 3:
                //testContent
                outResult +=  `\t/* testContent */\n`
                outResult += `\t(function(${instance?instance:'client'},data,props){ \n`
                outResult +=  `\t${item.render()} \n`
                outResult += `\t})(${instance?instance:'client'},data,props), \n` 
                break;
        }
    })
    //promise all end
    outResult += `\t\t])\n`
    //render end
    outResult += `\t})(${instance?instance:'client'},data,${this.props?JSON.stringify(this.props):'false'}),\n`
    return outResult
}






module.exports = {
    render,
    renderExport,
}
