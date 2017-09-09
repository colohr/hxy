
const World = {
	get Continent(){ return this.Country.Continent },
	get Country(){ return require('./Country') },
	get Currency(){ return this.Country.Currency },
	get Language(){ return this.Country.Language }
}


//exports
module.exports = World