const crypto = require('crypto');
const { mkdirSync, writeFileSync } = require('fs');
const { join } = require('path');

function keypair ( type, passphrase ) {
  const format = 'pem';
  const modulusLength = 2048;
  let pairKeys = {};
  switch (type) {
    case "rsa": {
        const options = {
            modulusLength,
            publicKeyEncoding: {
                type: "spki",
                format 
            },
            privateKeyEncoding: {
                type: "pkcs8",
                format,
                cipher: "aes-128-cbc",
                passphrase 
            }
        }; 
        // Genera el par de claves usando la función keygen
        pairKeys = crypto.generateKeyPairSync('rsa', options);
        break;
    }
    case "rsa-pss": {
        const options = {
            modulusLength,
            publicKeyEncoding: {
                type: "spki",
                format 
            },
            privateKeyEncoding: {
                type: "pkcs8",
                format,
                cipher: "aes-128-cbc",
                passphrase 
            }
        };
        // Genera el par de claves usando la función keygen
        pairKeys = crypto.generateKeyPairSync('rsa-pss', options);
        break;
    }
  }
  // Crea la carpeta de salida si no existe
  mkdirSync('./.secrets', { recursive: true });
  // Guarda la clave pública en un archivo
  writeFileSync(join('./.secrets', `public.key`), pairKeys.publicKey.toString());
  // Guarda la clave privada en un archivo (cifrada con la frase de contraseña)
  writeFileSync(join('./.secrets', `private.key`), pairKeys.privateKey.toString());
  return "Done pair keys generated"
}

module.exports = {
    "keypair": keypair
}