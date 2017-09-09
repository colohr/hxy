const MetaData = require('./Data')
const targets = ['locale','type','title','description','url','name','site_name','image']
const defaults = {
	locale:'en_US',
	type:'website'
}
class Facebook extends MetaData{
	
	constructor(data){
		super(data,{
			notation:'facebook',
			rename:{
				name:'site_name'
			}
		})
	}
	get html(){ return get_html(this) }
}

//export
module.exports = Facebook

//shared actions
function get_html(meta){
	let list = []
	let data = meta.data
	for(let name of targets){
		let item = {}
		item.property = `og:${name}`
		let content = null
		if(name in data){
			content = data[name]
		}
		else{
			switch(name){
				case 'site_name':
					if(data.name) content = data.name
					else if(data.title) content = data.title
					break
			}
		}
		if(content === null && name in defaults) content = defaults[name]
		if(content !== null){
			item.content = content
			list.push(item)
		}
		
	}
	return list.map(item=>meta.tag(item)).join('\n\t\t')
}

	//<meta property="og:locale" content="${app.locale}"/>
	//<meta property="og:type" content="${app.type}"/>
	//<meta property="og:title" content="${app.title}"/>
	//<meta property="og:description" content="${app.description}"/>
	//<meta property="og:url" content="${app.url}"/>
	//<meta property="og:site_name" content="${app.name}"/>
	//<meta property="og:image" content="${app.image}"/>