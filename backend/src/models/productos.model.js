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

const actualizarEstado = (id, nuevoEstado) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE productos SET activo = ? WHERE id = ?";
        db.query(sql, [nuevoEstado, id], (err, result) => {
            if (err) {
                reject(err);
            } else if (result.affectedRows === 0) {
                resolve(null); // Producto no encontrado
            } else {
                resolve({ id, activo: nuevoEstado }); // Confirmación básica
            }
        });
    });
};


export default { getAll, actualizarEstado };
