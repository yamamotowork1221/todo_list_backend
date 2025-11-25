import { pool } from './db';

export const createTask = async (userId: number | string, taskName: string, taskDetails: string, endDate: string) => {

    const safeUserId = String(userId).replace(/[^a-zA-Z0-9_]/g, "");
    const tableName = `private_project_${safeUserId}`;

    const result = await pool.query(`
        INSERT INTO ${tableName} (
          task_name,
          task_details,       
          end_date
        )
        VALUES ($1, $2, $3) RETURNING *
        `,
        [taskName, taskDetails, endDate]
    );
    return result.rows[0];
};

export const updateTask = async (userId: number | string, taskId: number, taskName: string, taskDetails: string, endDate: string) => {

    const safeUserId = String(userId).replace(/[^a-zA-Z0-9_]/g, "");
    const tableName = `private_project_${safeUserId}`;

    const result = await pool.query(`
        UPDATE ${tableName} SET 
        task_name = $1, 
        task_details = $2, 
        end_date = $3
        WHERE task_id = $4 RETURNING *
        `,
        [taskName, taskDetails, endDate, taskId]
    );
    return result.rows[0] || null;
};

export const completedTask = async (userId: number | string, taskId: number) => {

    const safeUserId = String(userId).replace(/[^a-zA-Z0-9_]/g, "");
    const tableName = `private_project_${safeUserId}`;

    const result = await pool.query(`
        UPDATE ${tableName} SET 
        is_completed = $1 
        WHERE task_id = $2 RETURNING *
        `,
        [true, taskId]
    );
    return result.rows[0] || null;
};

export const deleteTask = async (userId: number | string, taskId: number) => {

    const safeUserId = String(userId).replace(/[^a-zA-Z0-9_]/g, "");
    const tableName = `private_project_${safeUserId}`;

    const result = await pool.query(
        `DELETE FROM ${tableName} WHERE task_id = $1 RETURNING *`,
        [taskId]
    );
    return result.rows[0] || null;
};

export const getAllTask = async (userId: number | string) => {

    const safeUserId = String(userId).replace(/[^a-zA-Z0-9_]/g, "");
    const tableName = `private_project_${safeUserId}`;

    const result = await pool.query(
        `SELECT * FROM ${tableName} `
    );
    return result.rows;
};

export const getPendingTasks = async (userId: number | string) => {

    const safeUserId = String(userId).replace(/[^a-zA-Z0-9_]/g, "");
    const tableName = `private_project_${safeUserId}`;

    const result = await pool.query(
        `SELECT * FROM ${tableName} WHERE is_completed = $1 ORDER BY end_date ASC`,
        [false]
    );
    return result.rows;
};

export const getCompletedTasks = async (userId: number | string) => {

    const safeUserId = String(userId).replace(/[^a-zA-Z0-9_]/g, "");
    const tableName = `private_project_${safeUserId}`;

    const result = await pool.query(
        `SELECT * FROM ${tableName} WHERE is_completed = $1 ORDER BY end_date ASC`,
        [true]
    );
    return result.rows;
};

export const getTaskById = async (userId: number | string, taskId: number) => {

    const safeUserId = String(userId).replace(/[^a-zA-Z0-9_]/g, "");
    const tableName = `private_project_${safeUserId}`;

    const result = await pool.query(
        `SELECT * FROM ${tableName} WHERE task_id = $1`,
        [taskId]
    );
    return result.rows[0] || null;
};