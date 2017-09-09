//exports
module.exports = value =>  require('punycode').ucs2.decode(value).map(code => 'U+' + Number(code).toString(16).toUpperCase()).join(' ')
