import db from '../database/connection.js';

const getAll = async () => {
    const [rows] = await db.execute('SELECT * FROM productos');
    return rows;
};

const actualizarEstado = async (id, nuevoEstado) => {
    const [result] = await db.execute(
        'UPDATE productos SET activo = ? WHERE id = ?',
        [nuevoEstado, id]
    );

    if (result.affectedRows === 0) return null;

    // Retornar el producto actualizado
    const [rows] = await db.execute('SELECT * FROM productos WHERE id = ?', [id]);
    return rows[0];
};

const actualizarProducto = async (id, { nombre, precio, img, categoria }) => {
    const [result] = await db.execute(
        `UPDATE productos SET nombre = ?, precio = ?, img = ?, categoria = ? WHERE id = ?`,
        [nombre, precio, img, categoria, id]
    );

    if (result.affectedRows === 0) {
        return null; // Producto no encontrado
    }

    // Retornar el producto actualizado
    const [rows] = await db.execute('SELECT * FROM productos WHERE id = ?', [id]);
    return rows[0];
};

export default { getAll, actualizarEstado, actualizarProducto };