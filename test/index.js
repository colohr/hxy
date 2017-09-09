const hxy = require('../')
const fxy = require('fxy')

const data = require('./app.json')
data.folder = __dirname

const app = hxy(data)
console.log(`${app.document}`)

//let facebook = new hxy.Meta.Facebook(app)
//let twitter = new hxy.Meta.Twitter(app)
//console.log('facebook\n---------')
//console.log(facebook)
//console.log(`${facebook}`)
//
//console.log('twitter\n---------')
//console.log(twitter)
//console.log(`${twitter}`)