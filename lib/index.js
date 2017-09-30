const fxy = require('fxy')
const Document = require('./Document')
const Meta = require('./Meta')
const Manifest = require('./Manifest')
const World = require('./World')
const util = require('./utility')


class AppData{
	constructor(data,cloud){
		this.cloud = fxy.is.data(cloud) ? cloud:null
		this.country = get_country(data)
		this.data = data
		this.meta = new Meta(data)
		this.manifest = new Manifest(data)
		this.document = new Document(this)
	}
	
	get color(){ return this.data.color || this.data.theme_color || '#cad8da' }
	get css(){ return get_css(this) }
	get file(){ return get_file(this) }
	get folder(){ return this.data.folder }
	get favicon(){ return this.data.favicon }
	get head(){ return get_head(this) }
	get path(){ return this.data.path || '' }
	request(request,response){
		response.header('Content-Type','text/html')
		response.send(this.file.index.content)
	}
	save(){
		let file = this.file
		if(!file.index.exists) {
			console.log('will create: ',file.index.path)
			fxy.writeFileSync(file.index.path,`${this.document}`,'utf8')
		}
		if(!file.template.exists){
			console.log('will create: ',file.template.path)
			fxy.writeFileSync(file.template.path,`${this.document}`,'utf8')
		}
		return this
	
	}
	get site(){ return this.data.site || '' }
	get stylesheets(){ return get_stylesheets(this) }
	get title(){ return this.data.title }
	get url(){ return this.cloud ? this.cloud.url : this.data.url }
	get webapp(){ return this.data.webapp || {} }
	
}

//exports
module.exports = data=>new AppData(data)
module.exports.Document = Document
module.exports.Graphic = require('./Graphic')
module.exports.Manifest = Manifest
module.exports.Meta = Meta
module.exports.World = World

//shared actions

function get_country(data){ return World.Country.find(get_country_id(data)) }

function get_country_id(data){
	if('country' in data) return data.country
	else if('company' in data){
		let company = data.company
		if('country' in company) return company.country
		else if('location' in company){
			let location = company.location
			if('country' in location) return location.country
		}
	}
	return 'US'
}

function get_css(app){
	let css = []
	if(app.data.css) css = css.concat(app.data.css)
	if('wwi' in app.data) css.push('/modules/wwi/component/design/css/index.css')
	return css
}

function get_file(data){
	return {
		index:{
			get content(){ return this.exists ? fxy.readFileSync(this.path,'utf8'):'' },
			get exists(){ return fxy.exists(this.path) },
			get path(){ return fxy.join(data.folder,data.site,'index.html') }
		
		},
		template:{
			get content(){ return this.exists ? fxy.readFileSync(this.path,'utf8'):'' },
			get exists(){ return fxy.exists(this.path) },
			get path(){ return fxy.join(data.folder,data.site,'index.template.html') }
		}
	}
}

function get_head(data){
	let head = []
	let href = data.url
	if(href) head.push(`<link rel="canonical" href="${href}"/>`)
	head.push(`\t<!--Meta-->`)
	head.push(`${data.meta}`)
	let shortlink = data.manifest.shortlink || href
	if(shortlink) head.push(`\t<link rel="shortlink" href="${shortlink}" />`)
	head.push(`\t<!--Manifest-->`)
	let manifest_path = 'path' in data ? fxy.join(data.path,'manifest.json'):'manifest.json'
	let favicon = data.favicon
	if(favicon) head.push(`\t<link rel="icon" href="${favicon}">`)
	head.push(`\t<!--WebApp-->`)
	head.push(`\t<link rel="manifest" href="${manifest_path}">`)
	
	head.push(`\t<meta name="theme-color" content="${data.color}">`)
	head.push(`\t<meta name="mobile-web-app-capable" content="${data.webapp.capable || 'no'}">`)
	head.push(`\t<meta name="application-name" content="${data.manifest.name || data.title}">`)
	head.push(`\t<meta name="apple-mobile-web-app-capable" content="${data.webapp.capable || 'no'}">`)
	head.push(`\t<meta name="apple-mobile-web-app-status-bar-style" content="${data.webapp.bar || 'black-translucent'}">`)
	head.push(`\t<meta name="apple-mobile-web-app-title" content="${data.manifest.name || data.title}">`)
	head.push(get_icons(data))
	head.push(`\t<!--Styles-->`)
	head.push(get_stylesheets(data))
	head.push(`\t<!--Code-->`)
	head.push(get_head_scripts(data))
	return head.join('\n\t')
}

function get_head_scripts(app){
	if('wwi' in app.data){
		let script = 'script' in app.data.wwi ? app.data.wwi.script:{}
		let imports = script.imports || 'custom-elements.html'
		let path = script.path || app.path || '/'
		let modules = script.modules || 'modules/'
		let file_path = fxy.join(path,modules,'wwi/code.es6')
		return `\t<script async defer import="${imports}" path="${path}" modules="${modules}" src="${file_path}"></script>`
	}
	return ``
}

function get_icons(data){
	let tag = util.tag('link',{closed:true,defaults:{rel:'apple-touch-icon'},skip:['type','src']})
	let values = []
	let icons = data.manifest.icons
	if(Array.isArray(icons)){
		for (let icon of icons){
			let value = tag(Object.assign({href:icon.src},icon))
			if(value) values.push(value)
		}
		let tile = icons.filter(icon=>icon.sizes === '144x144')[0] || icons[0]
		if(tile) values.push(`\t<meta name="msapplication-TileImage" content="${tile.src}">`)
	}
	values.push(`\t<meta name="msapplication-TileColor" content="${data.color}">`)
	values.push(`\t<meta name="msapplication-tap-highlight" content="no">`)
	
	if(values.length) return `${values.join('\n\t')}`
	return ''
}

function get_stylesheets(data){
	let tag = util.tag('link',{closed:true,defaults:{rel:"stylesheet",async:"",defer:""}})
	let values = []
	let sheets = data.css
	for(let sheet of sheets) values.push(`\t${tag({href:sheet})}`)
	if('wwi' in data.data){
		
		values.push(`
		<!--WWI Style-->
		<style>
		      body {
		          overflow: hidden;
		          max-width: 100vw;
			      background-image: url('/components/wwe/background/graphics/effects/overlay/big-eye.png');
			      background-size: 100% auto;
			      background-position: bottom center;
			      background-repeat: no-repeat;
		      }
		      ${data.data.tag}{visibility: hidden}
		      [banner] {
			      position: absolute;
			      width: calc(100% - 20px);
			      padding: 10px;
		      }
		      [banner] img{max-width: 100%;}
			  body[components-ported] ${data.data.tag}{
				visibility: visible;
			  }
		</style>`)
	}
	
	return `${values.join('\n')}`
}

