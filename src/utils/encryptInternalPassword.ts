import crypto from 'crypto';

export const encryptInternalPassword = (internalPassword: string, password: string) => {

    const key = crypto.pbkdf2Sync(password, 'fixed-salt', 100000, 32, 'sha256');
    const cipher = crypto.createCipheriv('aes-256-ecb', key, null);
    cipher.setAutoPadding(true);
    let encrypted = cipher.update(internalPassword, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
};