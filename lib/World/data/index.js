const path = require('path')
const data_folder = path.join(__dirname,'countries-list/dist')

//exports
module.exports = new Proxy({
	"continents":["continent"],
	"countries_emoji":["emoji"],
	"countries":["country"],
	"languages":["language"],
	"languages_all":["all"]
},{ get, has })

//shared actions
function get(index,name){
	if(name === 'names') return get_names(index)
	
	//return value
	return {
		file:get_file(),
		get ids(){ return get_ids(this.value) },
		name,
		get value(){ return get_value(this.file) }
	}
	
	//shared actions
	function get_file(){
		let data_name = get_data_name()
		if(data_name) return `${data_name}.min.json`
		return null
		//shared actions
		function get_data_name(){
			if(name in index) return name
			for(let i in index) if(index[i].includes(name)) return i
			return null
		}
	}
	function get_names(index){
		let names = []
		for(let i in index) names.concat(index[i])
		return names
	}
	function get_ids(value){
		if(value !== null) return Object.keys(value)
		return []
	}
	function get_value(file){ return file ? require(path.join(data_folder,file)):null }
}

function has(index,name){
	if(name in index) return true
	for(let i in index) if(index[i].includes(name)) return true
	return false
}