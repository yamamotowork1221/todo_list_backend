import crypto from 'crypto';

export const decryptInternalPassword = (encrypted: string, password: string) => {

    const key = crypto.pbkdf2Sync(password, 'fixed-salt', 100000, 32, 'sha256');
    const decipher = crypto.createDecipheriv('aes-256-ecb', key, null);
    decipher.setAutoPadding(true);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
};