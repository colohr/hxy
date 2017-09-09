const database = require('./data')
const Type = require('../Type')


class Continent extends Type{
	constructor(id){
		super({id})
	}
	get name(){ return database.continents.value[this.id] || null }
}

//exports
module.exports = Continent