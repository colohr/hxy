const fxy = require('fxy')
class Manifest{
	constructor(data){
		let folder = 'folder' in data ? data.folder:null
		if(!fxy.is.text(folder) || !fxy.exists(folder)) throw new Error('Folder in data is invalid. Could not set Manifest for project.')
		let manifest_path = fxy.join(folder,'manifest.json')

		if(!fxy.exists(manifest_path)) fxy.json.writeSync(manifest_path,{})
		let manifest_data = require(manifest_path)
		data.manifest = manifest_data
		let updated_data = fxy.as.one({},get_manifest_data(data))
		if(changed(manifest_path,updated_data)) fxy.json.writeSync(manifest_path,updated_data)
		Object.assign(this,updated_data)
	}
}

//exports
module.exports = Manifest

//shared actions
function changed(a,b){ return JSON.stringify(a) !== JSON.stringify(b) }
function get_manifest_data(data){
	let value = 'manifest' in data ? data.manifest:{}
	let manifest = {
		"name": value.name || data.title || data.name,
		"short_name": value.short_name || data.name || data.title,
		"start_url": value.start_url || ".",
		"display": value.display || "standalone",
		"background_color": value.background_color || "#fff",
		"description": value.description || data.description || '',
		"icons": value.icons || []
	}
	let related = value.related_applications || [{"platform": "web"}]
	if(data.google && data.google.play){
		related.push({
			platform:'play',
			url:data.google.play.url
		})
	}
	manifest.related_applications = related
	return manifest
}