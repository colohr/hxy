
class Document{
	constructor(app){ this.app=app }
	get body(){ return get_body(this) }
	get country(){ return this.app.country }
	get head(){ return this.app.head }
	get language(){ return this.app.country.language.locale }
	get title(){ return this.app.title }
	//js prototype
	toString(){ return get_html(this) }
}

//exports
module.exports = Document

//shared actions
function get_html(document){
	return `
<!DOCTYPE html>
<html lang="${document.language}">
    <head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
		<title>${document.title}</title>
		${document.head}
	</head>
	<body>
		${document.body}
	</body>
</html>`
}

function get_body(document){
	let body = document.app.body || '<div banner gui horizontal center-center><img alt="Logo" src="/media/logo.png" /></div>'
	if('tag' in document.app.data) body += `<${document.app.data.tag}></${document.app.data.tag}>`
	body +=	`
		<noscript>
			${document.title}
			Please enable JavaScript to view this website.
		</noscript>`
	return body
}