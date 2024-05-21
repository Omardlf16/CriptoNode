const crypto = require('crypto');
const { readFileSync } = require('fs');

function verify ( input, publicKey, sign) { 
    return crypto.verify("RSA-SHA256", readFileSync(input), readFileSync(publicKey), Buffer.from(sign,'hex') );
}

module.exports = {
    "verify": verify
}