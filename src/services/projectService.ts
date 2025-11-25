import { pool } from './db';

export const createPrivateProject = async (userId: number | string) => {

    const safeUserId = String(userId).replace(/[^a-zA-Z0-9_]/g, "");
    const tableName = `private_project_${safeUserId}`;

    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${tableName}(
        task_id SERIAL PRIMARY KEY,
        task_name BYTEA,
        task_details BYTEA,       
        end_date DATE,
        is_completed BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
};

export const deletePrivateProject = async (userId: number | string) => {

    const safeUserId = String(userId).replace(/[^a-zA-Z0-9_]/g, "");
    const tableName = `private_project_${safeUserId}`;

    await pool.query(
        `DROP TABLE IF EXISTS ${tableName};`
    );
};