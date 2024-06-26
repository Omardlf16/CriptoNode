const prng = require("./prng/index.js");
const cipher = require("./cipher/index.js");
const decipher = require("./decipher/index.js");
const hash = require("./hash/index.js");
const hmac = require("./hmac/index.js");
const diffieHellman = require("./diffie-hellman/index.js");
const keypair = require("./keypair/index.js");
const verify = require("./verify/index.js");
const sign = require("./sign/index.js");
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

    case "dh":
      console.log('Compute keys for diffie-hellman exchange or compute secret from keys if provided\n',
                  'Flags requered:\n',
                  'publicKey: alias -pub\t  ["String"]\n',
                  'prime: alias -prime\t  ["String"]\n',
                  'generator: alias -gen\t  ["String"]\n',
                  'privateKey: alias -priv\t  ["String"]\n',
                  'encoding: alias -enc\t  [default: "hex"]["base64","hex","binary"]\n');
  
      if ( options.pub | !["base64","hex","binary"].includes(options.enc) ) {
        if ( !options.prime | !options.prime | !options.gen | !options.priv ) {   
          console.error('No choose option provided or params are not valid');
          console.error('Usage: node index.js -ch dh -pub publicKey -prime prime -gen generator -priv selfPrivateKey');
          console.error('Values recived ', options);
          process.exit(1);
        }
      }

      let from = null;

      if (options.pub) {
        from = {
            prime: options.prime,
            generator: options.gen,
            publicKey: options.pub,
            privateKey: options.priv
        }
      }
  
      console.log(diffieHellman.diffieHellman(options.enc, from));
      break;
    
    case "verify":
      console.log('Verify the sign for a file given \n',
                  'Flags requered:\n',
                  'publicKey: alias -key\t  ["String"]\n',
                  'input: alias -i\t  ["String"]\n',
                  'signature: -sign\t  ["String"]\n');
  
      if ( !options.key | !options.i | !options.sign ) {
        console.error('No choose option provided or params are not valid');
        console.error('Usage: node index.js -ch verify -pub key -i path -sign sign');
        console.error('Values recived ', options);
        process.exit(1);
      }
  
      console.log(verify.verify(options.i, options.key, options.sign));
      break;
    case "keypair":
      console.log('Generate an assymetric key pair\n',
                  'Flags requered:\n',
                  'type: alias -t\t  ["String"][rsa, rsa-pss]\n',
                  'passphrase: alias -p\t  ["String"]\n');
  
      if ( !options.p | !["rsa","rsa-pss"].includes(options.t) ) {
        console.error('No choose option provided or params are not valid');
        console.error('Usage: node index.js -ch keypair -t rsa -p password');
        console.error('Values recived ', options);
        process.exit(1);
      }
  
      console.log(keypair.keypair( options.t, options.p, options.out ));
      break;
    case "sign":
      console.log('Sign a file\n',
                  'Flags requered:\n',
                  'key: alias -k\t  ["String"]\n',
                  'input: alias -i\t  ["String"]\n', 
                  'passphrase: alias -p\t  ["String"]\n');
  
      if ( !options.i | !options.k | !options.p ) {
        console.error('No choose option provided or params are not valid');
        console.error('Usage: node index.js -ch sign -k publicKey -i inputPath -p password');
        console.error('Values recived ', options);
        process.exit(1);
      }
  
      console.log(sign.sign(options.i, options.k, options.p));
      break;
  default:
    console.log('Selected option are invalid use -ch option');
}
