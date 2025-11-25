import crypto from 'crypto';

export const generateInternalPassword = () => {
    return crypto.randomBytes(16).toString('hex'); 
};