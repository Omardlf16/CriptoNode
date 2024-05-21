const crypto = require('crypto');
const { readFileSync } = require('fs');

function sign ( input, privateKey, passphrase ) {
    return crypto.sign("RSA-SHA256", readFileSync(input), { key: readFileSync(privateKey), passphrase }).toString('hex');
}

module.exports = {
    "sign": sign
}