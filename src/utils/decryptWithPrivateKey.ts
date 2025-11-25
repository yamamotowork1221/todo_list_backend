import crypto from "crypto";

export const decryptWithPrivateKey = (
  encryptedBase64: string,
  privateKey: string,
  passphrase: string
) => {
  const buffer = Buffer.from(encryptedBase64, "base64");

  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      passphrase,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    buffer
  );

  return decrypted.toString("utf8");
};