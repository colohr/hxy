const Type = require('../Type')
const unicode = require('../unicode')

class Emoji extends Type{
	constructor(name,character,code){
		super({name})
		this.character = character|| unicode.encode(this.name)
		this.code= code || unicode.decode(this.character)
	}
}

//exports
module.exports = Emoji