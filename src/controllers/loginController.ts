import { verifyUserByEmail } from '../../src/services/userService'
import bcrypt from 'bcrypt';
import session from 'express-session';
import type { Request, Response } from 'express';

export const loginHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const verifyUser = await verifyUserByEmail(email);

        if (!verifyUser) {
            throw new Error('ユーザーが存在しません');
        }

        const isMatch = await bcrypt.compare(password, verifyUser.user_password.toString());
        if (!isMatch) {
            throw new Error('パスワードが一致しません');
        }

        (req.session as any).userId = verifyUser.id;
        (req.session as any).userKey = password;

        res.json({ message: 'ログイン成功' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error' });
    };
}

export const loginCheckHandler = async (req: Request, res: Response) => {
    if ((req.session as any).userId) {
        res.json({ loggedIn: true, userId: (req.session as any).userId });
    } else {
        res.status(401).json({ loggedIn: false });
    }
}

export const logoutHandler = async (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('セッション破棄エラー:', err);
            res.status(500).json({ message: 'ログアウトできませんでした' });
        }

        res.clearCookie('connect.sid');
        res.json({ message: 'ログアウト成功' });
    });
}