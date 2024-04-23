const crypto = require('crypto');
const { readFileSync } = require('fs');

function hmac_hash (algorithm="sha256", key, input, encoding) {
    return crypto.createHmac(algorithm, Buffer.from(key)).update(readFileSync(input)).digest(encoding);
}

module.exports = {
    "hmac_hash": hmac_hash
}