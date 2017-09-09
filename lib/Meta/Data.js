const Tag = require('../Tag')

class Meta extends Tag{
	static get closed(){ return true }
	static get tag(){ return 'meta' }
}

//exports
module.exports = Meta
