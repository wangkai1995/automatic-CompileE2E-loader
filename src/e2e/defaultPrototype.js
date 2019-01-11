


var { isEmptyObject,isObject,wranError } = require('../util/tool.js')




class E2EDefault {

    constructor(config) {}

    $mixin(provider) {
        if (!provider || isObject(provider) || isEmptyObject(provider)) {
            wranError('$mixin receive params not right')
        }
        for (var key in provider) {
            if (this[key]) {
                wranError(' $mixin method key: '+key+' is exist')
                continue
            }
            this[key] = provider[key]
        }
    }

}




module.exports = E2EDefault

