import mysql2 from 'mysql2';
import mysql2Promise from 'mysql2/promise';

export const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'blog',
});

export const dbPromise = async (query: string, values: any[] = []) => {
    const db = await mysql2Promise.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'blog',
    });

    const [rows] = await db.execute(query, values);

    await db.end();

    return rows;
};
