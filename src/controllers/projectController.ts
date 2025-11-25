import { env } from '../../src/config/env'
import type { Request, Response } from 'express';

export const getAllUsers = (req: Request, res: Response) => { /* 全ユーザー取得 */ }
export const getUserById = (req: Request, res: Response) => { /* 1ユーザー取得 */ }
export const createUser = (req: Request, res: Response) => { /* 新規作成 */ }
export const updateUser = (req: Request, res: Response) => { /* 更新 */ }
export const deleteUser = (req: Request, res: Response) => { /* 削除 */ }