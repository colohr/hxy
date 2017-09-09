const database = require('./data')
const Type = require('../Type')

class Language extends Type{
	static get get(){ return get_language }
	constructor(id){
		super(get_data(id))
		this.locale = id
	}
	get direction(){ return this.rtl ? 'rtl':'ltr' }
}

//exports
module.exports = Language

//shared actions
function get_data(id) {
	let data = id && id !== 'unknown' ? database.languages.value[id]:null
	return  data || {name: 'Unknown', native: '', locale: ''}
}

function get_language(languages,index=0){
	let id = Array.isArray(languages) ? languages[index]:null
	if(!id) id = 'unknown'
	return new Language(id)
}