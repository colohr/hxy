const fxy = require('fxy')
const util = require('./utility')

const data_binder = Symbol('data binder')
const data_value = Symbol('data value')

class Tag{
	static get util(){ return util }
	static get info(){ return {closed:this.closed||false,defaults:this.defaults,skip:this.skip} }
	static get tag(){ throw new Error(`The class: "${this.name}" extended by Tag needs a static valid "tag" value for the html name.`)}
	constructor(data,binder){
		if(fxy.is.data(data)) this[data_value] = data
		if(fxy.is.text(binder)) binder = {notation:binder}
		if(fxy.is.data(binder)) this[data_binder] = binder
		this.tag = util.tag(this.constructor.tag,this.constructor.info)
	}
	
	get data(){ return get_data(this) }
	get html(){ return this.tag(this) }
	//js prototype
	toString(){ return this.html }
}

//exports
module.exports = Tag


//shared actions
function get_bound_value(data,binder){
	let dots = binder.notation
	let name = fxy.id._(dots)
	let value = fxy.dot.get(data,dots)
	let bound_data = {}
	if(fxy.is.data(value)) bound_data = fxy.as.one({},value)
	else if(fxy.is.text(value)) bound_data[name] = value
	else if(fxy.is.TF(value)) bound_data[name] = value+''
	else if(fxy.is.number(value)) bound_data[name] = value+''
	
	if('rename' in binder){
		let new_names = fxy.is.data(binder.rename) ? binder.rename:{[name]:binder.rename}
		for(let rename in new_names){
			if(rename in bound_data){
				let new_name = new_names[rename]
				bound_data[new_name] = bound_data[rename]
				delete bound_data[rename]
			}
		}
	}
	
	return fxy.as.one({},data,bound_data)
}

function get_data(tag){
	let data = data_value in tag ? tag[data_value]:{}
	if(data_binder in tag) data = get_bound_value(data,tag[data_binder])
	return data
}



