const crypto = require('crypto');

function prng (type, size, min, max, encode) {
    switch (type) {
        case "bytes":
            return crypto.randomBytes(size).toString(encode);
        case "int":
            return crypto.randomInt(min, max);
        case "uuid":
            return crypto.randomUUID();
    }
}

module.exports = {
    "prng": prng
}