import { env } from '../../src/config/env'
import { generateInternalPassword } from '../../src/utils/generateInternalPassword'
import { generateKeyPairFromInternalPassword } from '../../src/utils/generateKeyPairFromInternalPassword'
import { encryptInternalPassword } from '../../src/utils/encryptInternalPassword'
import { hashPassword } from '../../src/utils/hashPassword'
import { encryptWithPublicKey } from '../utils/encryptWithPublicKey'
import { createUser, deleteUser } from '../../src/services/userService'
import { createPrivateProject, deletePrivateProject } from '../../src/services/projectService'
import { createTask } from '../../src/services/taskService'
import type { Request, Response } from 'express';
import session from 'express-session';

export const signupHandler = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const internalPassword: string = generateInternalPassword();
        const { publicKey, privateKey, passphrase } = generateKeyPairFromInternalPassword(internalPassword);
        const encryptedInternalPassword = encryptInternalPassword(internalPassword, password);
        const encryptedprivateKey = encryptInternalPassword(privateKey, password);
        const hashedPassword = await hashPassword(password);
        const encryptedUsername = encryptWithPublicKey(username, publicKey);

        const response = await createUser(email, encryptedUsername, hashedPassword, encryptedInternalPassword, publicKey, encryptedprivateKey, passphrase);
        await createPrivateProject(response.id);

        const taskName = encryptWithPublicKey(username + 'の新しいタスク', publicKey);
        const taskDetails = encryptWithPublicKey('予定を追加してタスクを管理しよう', publicKey);

        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');

        const endDate = `${yyyy}-${mm}-${dd}`;

        await createTask(response.id, taskName, taskDetails, endDate);

        (req.session as any).userId = response.id;
        (req.session as any).userKey = password;

        res.json({ message: 'アカウント作成成功' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error' });
    };
}

export const deleteAccountHandler = async (req: Request, res: Response) => {
    try {
        if (!(req.session as any).userId) {
            throw new Error('未ログイン');
        };

        const userId = (req.session as any).userId;

        await deletePrivateProject(userId);
        await deleteUser(userId);

        req.session.destroy((err) => {
            if (err) {
                console.error('セッション破棄エラー:', err);
                res.status(500).json({ message: 'ログアウトできませんでした' });
            }

            res.clearCookie('connect.sid');
            res.json({ message: 'アカウント削除成功' });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error' });
    };
}