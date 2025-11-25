import { pool } from './db';

export const findUserByEmail = async (mailAddress: string) => {
    const result = await pool.query(
        'SELECT id, mail_address, user_name FROM users_lists WHERE mail_address = $1',
        [mailAddress]
    );
    return result.rows[0] || null;
};

export const verifyUserByEmail = async (mailAddress: string) => {
    const result = await pool.query(
        'SELECT id, mail_address, user_password FROM users_lists WHERE mail_address = $1',
        [mailAddress]
    );
    return result.rows[0] || null;
};

export const createUser = async (mailAddress: string, userName: string, userPassword: string, masterPassword: string, publicKey: string, privateKey: string, passphrase: string) => {
    const result = await pool.query(
        'INSERT INTO users_lists (mail_address, user_name,user_password,master_password,public_key,private_key,passphrase) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [mailAddress, userName, userPassword, masterPassword, publicKey, privateKey, passphrase]
    );
    return result.rows[0];
};

export const updateUser = async (id: number | string, mailAddress: string, userName: string, userPassword: string, masterPassword: string, privateKey: string) => {
    const result = await pool.query(
        'UPDATE users_lists SET mail_address = $1, user_name = $2, user_password = $3, masterPassword = $4,private_key = $5 WHERE id = $6 RETURNING *',
        [mailAddress, userName, userPassword, masterPassword, privateKey, id]
    );
    return result.rows[0] || null;
};

export const deleteUser = async (id: number | string) => {
    const result = await pool.query(
        'DELETE FROM users_lists WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0] || null;
};

export const getUserSessionById = async (id: number | string) => {
    const result = await pool.query(
        'SELECT id, mail_address, user_name, master_password,public_key,private_key,passphrase FROM users_lists WHERE id = $1',
        [id]
    );
    return result.rows[0] || null;
};

export const getUserProfileById = async (id: number | string) => {
    const result = await pool.query(
        'SELECT id, mail_address, user_name, public_key FROM users_lists WHERE id = $1',
        [id]
    );
    return result.rows[0] || null;
};