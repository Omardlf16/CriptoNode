const prng = require("./prng/index.js");
const cipher = require("./cipher/index.js");
const decipher = require("./decipher/index.js");
const hash = require("./hash/index.js");
const hmac = require("./hmac/index.js");
const types = ["bytes", "int", "uuid"];
const encs = ["ascii","utf8","utf-8","utf16le","utf-16le","ucs2","ucs-2","base64","base64url","latin1","binary","hex"];
const args = process.argv.slice(2);
const options = {size: 16, min: 0, max: 100, enc: 'hex'};

for (let i = 0; i < args.length; i += 2) {
  const optionName = args[i].replace(/^-+/, '');
  if (["min","max","size"].includes(optionName)) {
    options[optionName] = parseInt(args[i + 1]);
  } else {
    options[optionName] = args[i + 1];
  }
}

switch (options["ch"]) {
  case "prng":
    console.log('Generar un numero aleatorio\n',
                'Options:\n',
                'type:\t  [requered]["bytes", "int", "uuid"]\n',
                'size:\t  [default: 16][number]\n',
                'min:\t  [default: 0][number]\n',
                'max:\t  [default: 100][number]\n',
                'enc:\t  [default: "hex"]["ascii","utf8","utf-8","utf16le","utf-16le","ucs2","ucs-2","base64","base64url","latin1","binary","hex"]');

    if (!types.includes(options.type) | !encs.includes(options.enc) | isNaN(options.min) | isNaN(options.max) | isNaN(options.size)) {
      console.error('No choose option provided or params are not valid');
      console.error('Usage: node index.js -ch prng --type [required]');
      console.error('Values recived ', options);
      process.exit(1);
    }
    
    console.log(prng.prng(options.type, options.size, options.min, options.max, options.enc));
    break;
  case "cipher":
    console.log('Cifrar un archivo\n',
                'Flags requered :\n',
                'password: alias -p\t  ["String"]\n',
                'size:\t  \t[default: 128][128, 192, 256]\n',
                'salt:\t  \t[number]\n',
                'input:\t  alias -i\t ["String"]\n',
                'output:\t  alias -o\t ["String"]');

    if (!options.p | !options.salt | !options.i | !options.o) {
      console.error('No choose option provided or params are not valid');
      console.error('Usage: node index.js -ch cipher -p [required]');
      console.error('Values recived ', options);
      process.exit(1);
    }

    console.log(cipher.cipher(options.p, options.size, options.salt, options.i, options.o));

    break;
  case "decipher":
    console.log('Decifrar un archivo\n',
                'Flags requered :\n',
                'password: alias -p\t  ["String"]\n',
                'size:\t  \t[default: 128][128, 192, 256]\n',
                'salt:\t  \t[number]\n',
                'input:\t  alias -i\t ["String"]\n',
                'output:\t  alias -o\t ["String"]');

    if (!options.p | !options.salt | !options.i | !options.o) {
      console.error('No choose option provided or params are not valid');
      console.error('Usage: node index.js -ch cipher -p [required]');
      console.error('Values recived ', options);
      process.exit(1);
    }

    console.log(decipher.decipher(options.p, options.size, options.salt, options.i, options.o));
    break;
  case "decipher":
    console.log('Decifrar un archivo\n',
                'Flags requered :\n',
                'password: alias -p\t  ["String"]\n',
                'size:\t  \t[default: 128][128, 192, 256]\n',
                'salt:\t  \t[number]\n',
                'input:\t  alias -i\t ["String"]\n',
                'output:\t  alias -o\t ["String"]');

    if (!options.p | !options.salt | !options.i | !options.o) {
      console.error('No choose option provided or params are not valid');
      console.error('Usage: node index.js -ch cipher -p [required]');
      console.error('Values recived ', options);
      process.exit(1);
    }

    console.log(decipher.decipher(options.p, options.size, options.salt, options.i, options.o));
    break;
  
  case "hash":
    console.log('Hash a file\n',
                'Flags requered :\n',
                'algorithm: alias -a\t  [default: "sha256"]["md5","sha1","sha256","sha512"]\n',
                'enc:\t  [default: "hex"]["base64","base64URL","hex","binary"]\n',
                'input: alias -i\t  \t["String"]\n');

    if ( !options.i | !["base64","base64URL","hex","binary"].includes(options.enc) ) {
      console.error('No choose option provided or params are not valid');
      console.error('Usage: node index.js -ch hash -i [required]');
      console.error('Values recived ', options);
      process.exit(1);
    }

    console.log(hash.hash(options.a, options.i, options.enc));
    break;
  
    case "hmac":
      console.log('Generate a HMAC for a file\n',
                  'Flags requered :\n',
                  'algorithm: alias -a\t  ["sha256"]["md5","sha1","sha256","sha512"]\n',
                  'enc:\t  [default: "hex"]["base64","base64URL","hex","binary"]\n',
                  'key: alias -k\t  ["String"]\n',
                  'input: alias -i\t  \t["String"]\n');
  
      if ( !options.i | !["base64","base64URL","hex","binary"].includes(options.enc) ) {
        console.error('No choose option provided or params are not valid');
        console.error('Usage: node index.js -ch hash -i [required]');
        console.error('Values recived ', options);
        process.exit(1);
      }
  
      console.log(hmac.hmac_hash(options.a, options.k ,options.i, options.enc));
      break;
  default:
    console.log('Selected option are invalid');
}
