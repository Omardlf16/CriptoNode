const crypto = require('crypto');
const { readFileSync } = require('fs');

function hash (algorithm="sha256", input, encoding) {
    return crypto.createHash(algorithm).update(readFileSync(input)).digest(encoding);
}

module.exports = {
    "hash": hash
}