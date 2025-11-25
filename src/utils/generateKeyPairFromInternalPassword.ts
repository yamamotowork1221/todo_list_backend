import crypto from 'crypto';

export const generateKeyPairFromInternalPassword = (internalPassword: string) => {
    const seed = crypto.createHash('sha256').update(internalPassword).digest("hex");

    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicExponent: 0x10001,
        publicKeyEncoding: {
            type: "spki",
            format: "pem"
        },
        privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
            cipher: "aes-256-cbc",
            passphrase: seed,
        }
    });

    return { publicKey, privateKey, passphrase: seed };
};