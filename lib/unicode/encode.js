const base = 127462 - 'A'.charCodeAt(0)
const regex = /^[A-Z]{2}$/

//exports
module.exports = code => regex.test(code) ? require('punycode').ucs2.encode(code.split('').map(letter => base + letter.charCodeAt(0))):''

