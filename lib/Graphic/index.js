const get_size = require('./size')
class Graphic{
	static get size(){ return get_size }
	constructor(file){
		this.file = file
	}
	get_size(){
		return get_graphic_size(this).then(size=>{
			console.log({size})
			return {
				height:size.height+'px',
				width:size.width+'px'
			}
		})
	}
}

//exports
module.exports = Graphic

//shared actions
function get_graphic_size(graphic){ return get_size(graphic.file).catch(error=>console.error(error)) }