const database = require('./data')

const Continent = require('./Continent')
const Currency = require('./Currency')
const Emoji = require('../Emoji')
const Language = require('./Language')

const Type = require('../Type')



class Country extends Type{
	static get Continent(){ return Continent }
	static get Currency(){ return Currency }
	static find(country){ return find_country(country) }
	static get(id){ return new Country(id) }
	
	static get Language(){ return Language }
	static get list(){ return get_list() }
	constructor(id,data){
		super( get_data(id,data) )
		this.emoji = Emoji.value(this,{
			name:this.id,
			character:this.emoji,
			code:this.emojiU
		})
	}
	get continent(){ return Continent.value(this) }
	set continent(value){ return Continent.value(this,value) }
	get currency(){ return Currency.value(this) }
	set currency(value){ return Currency.value(this,value) }
	get language(){ return Language.value(this) || Language.get(this.languages) }
	set language(value){ return Language.value(this,value) }
}


//exports
module.exports = Country

//shared actions
function get_data(id,data){
	if(typeof data !== 'object') data = get_data_by_id(id)
	data.id = id
	return data
}

function get_data_by_id(id){
	if(typeof id === 'string') return database.countries.value[id] || {}
	return {}
}

function get_list(){
	return database.countries.ids.map(id=>new Country(id))
}

function find_country(country){
	let countries = database.countries.value
	if(typeof country === 'string'){
		for(let id in countries){
			let value = countries[id]
			if(id === country) return new Country(id,value)
			else if(value.name === country) return new Country(id,value)
			else if(value.native === country) return new Country(id,value)
		}
	}
	return new Country('US',countries.US)
}

