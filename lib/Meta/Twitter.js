const MetaData = require('./Data')
const targets = ['card','title','description','image']
const defaults = {
	card:'summary'
}

class Twitter extends MetaData{
	constructor(data){
		super(data,{
			notation:'twitter'
		})
	}
	get html(){ return get_html(this) }
}

//export
module.exports = Twitter

//shared actions
function get_html(meta){
	let list = []
	let data = meta.data
	for(let name of targets){
		let item = {}
		item.property = `twitter:${name}`
		let content = null
		if(name in data){
			content = data[name]
		}
		if(content === null && name in defaults) content = defaults[name]
		if(content !== null){
			item.content = content
			list.push(item)
		}
		
	}
	return list.map(item=>meta.tag(item)).join('\n\t\t')
}

//<meta name="twitter:card" content="${app.twitter.card}"/>
//	<meta name="twitter:description" content="${app.description}"/>
//	<meta name="twitter:title" content="${app.title}"/>
//	<meta name="twitter:image" content="${app.image}"/>${get_google_verification()}${get_rss_feeds()}
//