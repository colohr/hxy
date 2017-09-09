const Type = require('../Type')
class Currency extends Type{
	constructor(id){
		super({id})
	}
	get symbol(){ return '$' }
}

//exports
module.exports = Currency