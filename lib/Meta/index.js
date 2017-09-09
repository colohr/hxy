
const Facebook = require('./Facebook')
const Twitter = require('./Twitter')

class Meta{
	static get Facebook(){ return Facebook }
	static get Twitter(){ return Twitter }
	constructor(data){
		this.facebook = new Facebook(data)
		this.twitter = new Twitter(data)
	}
	//js prototype
	toString(){ return [`\t${this.facebook}`,`${this.twitter}`].join('\n\t\t') }
}

//exports
module.exports = Meta