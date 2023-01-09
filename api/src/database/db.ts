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

/*
* Database blog
*
* users
* - id            (Primary Key) INT
* - username      (VARCHAR 45, UNIQUE)
* - email         (VARCHAR 255, UNIQUE)
* - password      (VARCHAR 255)
* - image         (VARCHAR 255, NULLABLE)
*
* posts
* - id            (Primary Key) INT
* - title         (VARCHAR 255)
* - description   (VARCHAR 1000)
* - image         (VARCHAR 255)
* - category      (VARCHAR 45)
* - date          (TIMESTAMP or DATETIME)
* - user_id       (Foreign Key) INT
*
* tokens
* - id            (Primary Key) INT
* - access_token  (VARCHAR 255, NULLABLE)
* - refresh_token (VARCHAR 255, NULLABLE)
* - user_id       (Foreign Key) INT
*
* */
