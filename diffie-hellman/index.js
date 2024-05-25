const crypto = require('crypto');

function diffieHellman ( encoding, from=false ) {

    // {
    //   prime,
    //   generator,
    //   publicKey,
    //   privateKey
    // }

    if ( !from ) {
        const dh = crypto.createDiffieHellmanGroup("modp14");
        const publicKey = dh.generateKeys();

        return {
            prime: dh.getPrime().toString(encoding),
            generator: dh.getGenerator().toString(encoding),
            publicKey: publicKey.toString(encoding),
            privateKey: dh.getPrivateKey().toString(encoding), // No share!!
          };

    } else {
        const dh = crypto.createDiffieHellman(
            from.prime,
            encoding,
            from.generator,
            encoding
        );

        dh.setPrivateKey(from.privateKey, encoding);
        dh.setPublicKey(from.publicKey, encoding);
    
        const secret = dh.computeSecret(from.publicKey, encoding);
    
        return {
          prime: dh.getPrime().toString(encoding),
          generator: dh.getGenerator().toString(encoding),
          publicKey: dh.getPublicKey().toString(encoding),
          privateKey: dh.getPrivateKey().toString(encoding), // No share!!
          secret: secret.toString(encoding)
        };

        // Aqui se combinas las claves y se acuerda la key en conjunto
    }
  
}

module.exports = {
    "diffieHellman": diffieHellman
}