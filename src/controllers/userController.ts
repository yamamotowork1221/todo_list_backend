import { env } from '../../src/config/env'
import { getUserProfileById, getUserSessionById } from '../../src/services/userService'
import { decryptInternalPassword } from '../utils/decryptInternalPassword'
import { decryptWithPrivateKey } from '../utils/decryptWithPrivateKey'

import type { Request, Response } from 'express';

type UserProfileFromDb = {
    id: number;
    mail_address: string;
    user_name: Buffer;
    public_key: Buffer;
};

export const getUserProfileByIdHandler = async (req: Request, res: Response) => {
    try {
        if (!(req.session as any).userId) {
            throw new Error('未ログイン');
        };

        const userId = (req.session as any).userId;
        const userSession = await getUserSessionById((req.session as any).userId);
        const privateKey = decryptInternalPassword(userSession.private_key.toString(), (req.session as any).userKey);
        const passphrase = userSession.passphrase.toString();

        const rows: UserProfileFromDb[] = await getUserProfileById(userId);;

        const rowsArray = Array.isArray(rows) ? rows : [rows];

        const userProfile = rowsArray.map(row => ({
            id: row.id,
            mail_address: row.mail_address,
            user_name: decryptWithPrivateKey(row.user_name.toString(), privateKey, passphrase),
            public_key: row.public_key.toString(),
        }));

        return res.json(userProfile);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error' });
    };
};