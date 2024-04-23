const crypto = require('crypto');
const { createReadStream, createWriteStream } = require('fs');
const { pipeline } = require('stream');

function decipher (password, size, salt, input, output) {
    if (![128,192,256].includes(size) | isNaN(size)) {
      console.error('size value not valid');
      process.exit(1);
    }
    
    const cipher = crypto.createDecipheriv(`aes-${size}-cbc`, crypto.scryptSync(password, salt, size / 8), new Uint8Array(16), );

    pipeline(createReadStream(input), cipher, createWriteStream(output), 
      (err) => {
        if (err) throw err;
    });


}

module.exports = {
    "decipher": decipher
}