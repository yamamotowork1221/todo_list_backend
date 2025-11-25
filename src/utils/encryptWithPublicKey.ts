import crypto from 'crypto';

export const encryptWithPublicKey = (plaintext: string, publicKey: string) => {
  const buffer = Buffer.from(plaintext, 'utf8');

  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    buffer
  );

  return encrypted.toString('base64');
};