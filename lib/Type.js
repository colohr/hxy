const symbols = new Map()

class Type{
	static get symbol(){ return get_symbol(this) }
	static value(data,value){ return get_set_value(this,data,value) }
	constructor(data){
		if(typeof data === 'object' && data !== null) Object.assign(this,data)
	}
}

//exports
module.exports = Type

//shared actions
function get_symbol(type){
	let name = type.name
	return symbols.has(name) ? symbols.get(name):symbols.set(name,Symbol(name)).get(name)
}

function get_set_value(type,data,value){
	if(typeof data === 'object' && data !== null){
		let symbol = type.symbol
		if(typeof value !== 'undefined') data[symbol] = value
		return symbol in data ? data[symbol]:null
	}
	return null
}