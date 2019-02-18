


function renderExport(){
    var self = this;
    var { name,importTemplate,instance } = self.attrs
    var outResult = `module.exports['${name?name:importTemplate}'] = \n`;
    //render head
    outResult += `function(${instance?instance:'client'}) {\n`
    //render data
    outResult += `var data = ${JSON.stringify(self.data)};\n`
    //promise all model
    outResult += `return Promise.all([\n`
    //emtry promise 
    outResult += `new Promise(function(res,rej){return res()})\n`
    //render children content
    self.children.forEach(function(item){
        outResult += `.then(\n`
        switch(item.type){
            case 1:
                //testImport
                outResult += `/*${item.tagName} -${item.attrs['refName']}-${item.attrs['importComponent']}*/\n`
                outResult +=  `${item.render()}\n`
                break;
            case 2:
                //testModule
                outResult += `/* ${item.tagName} - ${item.attrs['refName']} */\n`
                outResult +=  `${item.render(instance)}\n`
                break;
            case 3:
                //testContent
                outResult +=  `/* testContent */\n`
                outResult += `(function(${instance?instance:'client'},data){\n`
                outResult +=  `var exe = function(client, data) {\n`
                outResult +=  `return new Promise(function(res,rej){${item.render()};return res()})}\n`
                outResult +=  `return function(){ return exe(client,data)}\n`
                outResult += `})(${instance?instance:'client'},data)\n` 
                break;
        }
        outResult += `)\n`
    })
    //promise all end
    outResult += `])\n`
    //render end
    outResult += `};\n`

    return outResult
}






function render(){
    var self = this;
    var { instance } = self.attrs
    var outResult = `(function(${instance?instance:'client'},data) {\n`
    //wap Exe
    outResult += `var wapnExe = function(client,data) {\n`
    //promise all model
    outResult += `return Promise.all([\n`
    //emtry promise 
    outResult += `new Promise(function(res,rej){return res()})\n`
    //render children content
    self.children.forEach(function(item){
        outResult += `.then(\n`
        switch(item.type){
            case 1:
                //testImport
                outResult += `/*${item.tagName} -${item.attrs['importComponent']}*/\n`
                outResult +=  `${item.render()}\n`
                break;
            case 2:
                //testModule
                outResult += `/* ${item.tagName} - ${item.attrs['refName']} */\n`
                outResult +=  `${item.render(instance)}\n`
                break;
            case 3:
                //testContent
                outResult +=  `/* testContent */\n`
                outResult += `(function(${instance?instance:'client'},data,props){\n`
                outResult +=  `var exe = function(client, data,props) {\n`
                outResult +=  `return new Promise(function(res,rej){${item.render()};return res()})}\n`
                outResult +=  `return function(){ return exe(client,data,props)}\n`
                outResult += `})(${instance?instance:'client'},data,${self.props?JSON.stringify(self.props):'false'})\n` 
                break;
        }
        outResult += `)\n`
    })
    //promise all end
    outResult += `])}\n`
    //wap Exe end
    outResult += `return function(){ return wapnExe(client,data)}\n`
    //render end
    outResult += `})(${instance?instance:'client'},data)\n`
    return outResult
}






module.exports = {
    render,
    renderExport,
}
