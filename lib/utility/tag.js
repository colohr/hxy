const fxy = require('fxy')

//exports
module.exports = export_tag

//shared actions
function export_tag(type,{closed,defaults,skip}){
	let open = `<${type} `
	let close = closed ? '':'>'
	let end = closed ? '>':`</${type}>`
	if(!Array.isArray(skip)) skip = []
	return function tag_action(data,content){
		if(!fxy.is.data(data)) return ''
		let attributes = get_attributes(data,defaults,skip)
		if(fxy.is.text(content) !== true) content = ''
		return `${open}${attributes.join(' ')}${close}${content}${end}`
	}
}

function get_attributes(data,defaults,skip){
	let attributes = get_default_attributes(data,defaults)
	for(let name in data){
		if(skip.includes(name) !== true) {
			let value = data[name]
			if(fxy.is.text(value)){
				let attribute = `${name}`
				if(value.length > 0) attribute += `="${value}"`
				attributes.push(attribute)
			}
		}
	}
	return attributes
}

function get_default_attributes(data,defaults){
	let attributes = []
	if(fxy.is.data(defaults)){
		for(let name in defaults){
			let value = defaults[name]
			if( !(name in data) ) {
				if(fxy.is.text(value)){
					let attribute = `${name}`
					if(value.length > 0) attribute += `="${value}"`
					attributes.push(attribute)
				}
			}
		}
	}
	return attributes
}