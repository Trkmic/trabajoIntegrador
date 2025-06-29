import db from '../database/connection.js';

const getAll = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM productos";
        
        db.query(sql, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

export default { getAll };
