import bcrypt from 'bcrypt';
import session from 'express-session';
import type { Request, Response } from 'express';
import { getPendingTasks, createTask, completedTask, getCompletedTasks, deleteTask } from '../../src/services/taskService'
import { getUserSessionById } from '../../src/services/userService'
import { decryptInternalPassword } from '../utils/decryptInternalPassword'
import { encryptWithPublicKey } from '../utils/encryptWithPublicKey'
import { decryptWithPrivateKey } from '../utils/decryptWithPrivateKey'

type TaskFromDb = {
    task_id: number;
    task_name: Buffer;
    task_details: Buffer;
    end_date: string;
    is_completed: boolean;
    created_at: string;
};

export const getAllTasksHandler = async (req: Request, res: Response) => {
    try {
        if (!(req.session as any).userId) {
            throw new Error('未ログイン');
        };

        const userSession = await getUserSessionById((req.session as any).userId);
        const privateKey = decryptInternalPassword(userSession.private_key.toString(), (req.session as any).userKey);
        const passphrase = userSession.passphrase.toString();

        const rows: TaskFromDb[] = await getPendingTasks((req.session as any).userId);

        if (!rows) {
            throw new Error('タスクがありません');
        };

        const decryptedTasks = rows.map(row => ({
            task_id: row.task_id,
            task_name: decryptWithPrivateKey(row.task_name.toString(), privateKey, passphrase),
            task_details: decryptWithPrivateKey(row.task_details.toString(), privateKey, passphrase),
            end_date: row.end_date,
            is_completed: row.is_completed,
            created_at: row.created_at
        }));

        return res.json(decryptedTasks);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error' });
    };
}

export const getCompletedTasksHandler = async (req: Request, res: Response) => {
    try {
        if (!(req.session as any).userId) {
            throw new Error('未ログイン');
        };

        const userSession = await getUserSessionById((req.session as any).userId);
        const privateKey = decryptInternalPassword(userSession.private_key.toString(), (req.session as any).userKey);
        const passphrase = userSession.passphrase.toString();

        const rows: TaskFromDb[] = await getCompletedTasks((req.session as any).userId);

        if (!rows) {
            throw new Error('タスクがありません');
        };

        const decryptedTasks = rows.map(row => ({
            task_id: row.task_id,
            task_name: decryptWithPrivateKey(row.task_name.toString(), privateKey, passphrase),
            task_details: decryptWithPrivateKey(row.task_details.toString(), privateKey, passphrase),
            end_date: row.end_date,
            is_completed: row.is_completed,
            created_at: row.created_at
        }));

        return res.json(decryptedTasks);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error' });
    };
}

export const createTaskHandler = async (req: Request, res: Response) => {
    try {
        if (!(req.session as any).userId) {
            throw new Error('未ログイン');
        };

        const userSession = await getUserSessionById((req.session as any).userId);
        const publicKey = userSession.public_key;

        const { taskName, taskDetails, endDate } = req.body;
        const userId = (req.session as any).userId;

        const encryptTaskName = encryptWithPublicKey(taskName, publicKey);
        const encryptTaskDetails = encryptWithPublicKey(taskDetails, publicKey);
        const inputEndDate = endDate || null;

        const newTask = await createTask(userId, encryptTaskName, encryptTaskDetails, inputEndDate);

        if (!newTask) {
            throw new Error('タスク作成失敗');
        }

        res.json({ message: 'タスク作成成功' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error' });
    };
}

export const completionTaskHandler = async (req: Request, res: Response) => {
    try {
        if (!(req.session as any).userId) {
            throw new Error('未ログイン');
        };
        const { task_id } = req.body;
        const userId = (req.session as any).userId;
        const taskId = parseInt(task_id, 10);
        const completionTask = await completedTask(userId, taskId);

        if (!completionTask) {
            throw new Error('タスク完了失敗');
        }

        res.json({ message: 'タスク完了成功' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error' });
    };
}

export const deleteTaskHandler = async (req: Request, res: Response) => {
    try {
        if (!(req.session as any).userId) {
            throw new Error('未ログイン');
        };
        const { task_id } = req.body;
        const userId = (req.session as any).userId;
        const taskId = parseInt(task_id, 10);
        const completionTask = await deleteTask(userId, taskId);

        if (!completionTask) {
            throw new Error('タスク削除失敗');
        }

        res.json({ message: 'タスク削除成功' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error' });
    };
}